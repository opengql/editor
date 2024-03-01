import { FileSystemUtil } from '../util/file-system-util';
import path from 'path';
import { FilenameUtil } from '../util/filename-util';
import { type ClassDeclaration, type ImportDeclaration, Project, type SourceFile } from 'ts-morph';
import { environment } from '../const/environment';
import { CodeService } from './code-service';
import { AntlrService } from './antlr-service';
import { Service } from 'typedi';
import { execSync } from 'child_process';

interface ExtractParserClassProps {
  readonly project: Project;
  readonly sourceFile: SourceFile;
  readonly basePath: string;
  readonly contextClassesNamesMap: Record<string, RegExp>;
}

interface ExtractContextClassesProps {
  readonly project: Project;
  readonly classes: ClassDeclaration[];
  readonly basePath: string;
  readonly contextClassesNamesMap: Record<string, RegExp>;
}

interface ExtractContextClassProps {
  readonly project: Project;
  readonly basePath: string;
  readonly classDeclaration: ClassDeclaration;
  readonly contextClassesNamesMap: Record<string, RegExp>;
}

@Service()
export class RefactorService {
  constructor(
    private readonly antlrService: AntlrService,
    private readonly codeService: CodeService,
  ) {}

  renameGeneratedFilesToKebabCase(generatedSourcePath: string): void {
    const fileNames = FileSystemUtil.getFileNamesInDirectory(generatedSourcePath);

    for (const fileName of fileNames) {
      if (FilenameUtil.isKebabCase(fileName)) {
        continue;
      }

      const filePath = path.join(generatedSourcePath, fileName);
      const kebabCasePattern = FilenameUtil.convertToKebabCase.bind(this);
      FileSystemUtil.renameFileWithPattern(filePath, kebabCasePattern);
    }
  }

  refactorParserFile(generatedSourcePath: string): void {
    console.log('Refactoring parser source file...');

    const parserFilePath = path.join(generatedSourcePath, 'gql-parser.ts');

    if (!FileSystemUtil.fileExists(parserFilePath)) {
      throw new Error('Parser file is not found. Is renaming action completed correctly?');
    }

    const parserFileSourceCode = FileSystemUtil.readFile(parserFilePath);

    FileSystemUtil.removeFile(parserFilePath);

    const project = new Project();
    const sourceFile = project.createSourceFile('tmp.ts', parserFileSourceCode);
    const contextClasses = this.getContextClasses(sourceFile);
    const contextClassesNamesMap = this.getClassesNamesMap(contextClasses);

    this.extractParserClass({
      project,
      sourceFile,
      basePath: generatedSourcePath,
      contextClassesNamesMap,
    });

    this.extractContextClasses({
      project,
      classes: contextClasses,
      basePath: generatedSourcePath,
      contextClassesNamesMap,
    });
  }

  refactorLexerFile(generatedSourcePath: string): void {
    console.log('Refactoring lexer source file...');

    const lexerFilePath = path.join(generatedSourcePath, 'gql-lexer.ts');

    if (!FileSystemUtil.fileExists(lexerFilePath)) {
      throw new Error('Lexer file is not found. Is renaming action completed correctly?');
    }

    const lexerFileSourceCode = FileSystemUtil.readFile(lexerFilePath);

    FileSystemUtil.removeFile(lexerFilePath);

    const project = new Project();
    const sourceFile = project.createSourceFile('tmp.ts', lexerFileSourceCode);
    const className = environment.lexerClassName;
    const lexerSourceCode = this.codeService.extractClassSourceCode(sourceFile, className);
    const lexerSourceFile = project.createSourceFile(lexerFilePath, lexerSourceCode);
    const usedANTLRClasses = this.antlrService.getClassesUsedInSource(lexerSourceCode, className);

    this.codeService.putNamedImports(lexerSourceFile, usedANTLRClasses, 'antlr4-typescript');

    lexerSourceFile.saveSync();

    console.log(`Extracting ${className} to ${lexerFilePath}`);
  }

  refactorListenerFile(generatedSourcePath: string): void {
    console.log('Refactoring parser listener source file...');

    const listenerFilePath = path.join(generatedSourcePath, 'gql-parser-listener.ts');

    if (!FileSystemUtil.fileExists(listenerFilePath)) {
      throw new Error('Listener file is not found. Is renaming action completed correctly?');
    }

    const listenerFileSourceCode = FileSystemUtil.readFile(listenerFilePath);

    FileSystemUtil.removeFile(listenerFilePath);

    const project = new Project();
    const sourceFile = project.createSourceFile('temp.ts', listenerFileSourceCode);
    const className = environment.listenerClassName;
    const listenerSourceCode = this.codeService.extractClassSourceCode(sourceFile, className);
    const listenerSourceFile = project.createSourceFile(listenerFilePath, listenerSourceCode);
    const usedANTLRClasses = this.antlrService.getClassesUsedInSource(listenerSourceCode, className);

    this.codeService.putNamedImports(listenerSourceFile, usedANTLRClasses, 'antlr4-typescript');

    this.getAllContextsImportsFromParserFile(generatedSourcePath).forEach((importDeclaration) => {
      this.codeService.putImportDeclaration(listenerSourceFile, importDeclaration);
    });

    listenerSourceFile.saveSync();

    console.log(`Extracting ${className} to ${listenerFilePath}`);
  }

  lintGeneratedFiles(outputDir: string): void {
    console.log('Performing linting operation on generated files...');

    const files = FileSystemUtil.getFileNamesInDirectoryRecursively(outputDir);

    for (const fileName of files) {
      const filePath = path.join(outputDir, fileName);

      execSync(`npx eslint -c ./.eslintrc.js --fix --no-ignore ${filePath}`);
      console.log(`Linted file ${filePath}`);
    }
  }

  private getContextClasses(parserSourceFile: SourceFile): ClassDeclaration[] {
    return parserSourceFile
      .getClasses()
      .filter((classDeclaration) => classDeclaration.getName() !== environment.parserClassName);
  }

  private getClassesNamesMap(classDeclarations: ClassDeclaration[]): Record<string, RegExp> {
    return [...classDeclarations]
      .map((classDeclaration) => classDeclaration.getName())
      .map((className) => className ?? '')
      .filter((className) => className !== '')
      .reduce((acc, className) => ({ ...acc, [className]: new RegExp(`\\b${className}\\b`, 'g') }), {});
  }

  private extractParserClass(props: ExtractParserClassProps): void {
    const { project, sourceFile, basePath, contextClassesNamesMap } = props;
    const parserFilePath = path.join(basePath, 'gql-parser.ts');
    const className = environment.parserClassName;
    const parserSourceCode = this.codeService.extractClassSourceCode(sourceFile, className);
    const parserSourceFile = project.createSourceFile(parserFilePath, parserSourceCode);
    const usedANTLRClasses = this.antlrService.getClassesUsedInSource(parserSourceCode, className);

    this.codeService.putNamedImports(parserSourceFile, usedANTLRClasses, 'antlr4-typescript');

    const contextClassesNames = Object.keys(contextClassesNamesMap);

    let currentIndex = 1;

    contextClassesNames.forEach((className) => {
      this.codeService.putNamedImport(parserSourceFile, className, '$generated/context');
      console.log(`Adding import: ${className} [${currentIndex}/${contextClassesNames.length}]`);
      currentIndex++;
    });

    parserSourceFile.saveSync();

    console.log(`Extracting ${className} to ${parserFilePath}`);
  }

  private extractContextClasses(props: ExtractContextClassesProps): void {
    const { project, classes, basePath, contextClassesNamesMap } = props;

    classes.forEach((classDeclaration) => {
      this.extractContextClass({ project, classDeclaration, basePath, contextClassesNamesMap });
    });
  }

  private extractContextClass(props: ExtractContextClassProps): void {
    const { project, classDeclaration, basePath, contextClassesNamesMap } = props;
    const className = classDeclaration.getName() ?? '';

    if (className === '') {
      return;
    }

    const fileName = `${FilenameUtil.convertToKebabCase(className)}.ts`;
    const filePath = path.join(basePath, 'context', fileName);
    const contextSourceCode = this.codeService.extractClassSourceCodeFromDeclaration(classDeclaration);
    const contextSourceFile = project.createSourceFile(filePath, contextSourceCode);
    const usedANTLRClasses = this.antlrService.getClassesUsedInSource(contextSourceCode, className);

    if (usedANTLRClasses.length === 0) {
      throw new Error(`Class ${className} has no ANTLR4 imports which is impossible!`);
    }

    this.codeService.putNamedImports(contextSourceFile, usedANTLRClasses, 'antlr4-typescript');
    this.codeService.putNamedImport(contextSourceFile, environment.parserClassName, '$generated');
    this.codeService.putNamedImport(contextSourceFile, environment.listenerClassName, '$generated');

    const usedContextClasses = Object.entries(contextClassesNamesMap)
      .filter(([key, regExp]) => key !== className && contextSourceCode.match(regExp) !== null)
      .map(([key]) => key);

    for (const usedClassName of usedContextClasses) {
      this.codeService.putNamedImport(contextSourceFile, usedClassName, '$generated/context');
    }

    contextSourceFile.saveSync();

    console.log(`Extracting ${className} to ${filePath}`);
  }

  private getAllContextsImportsFromParserFile(generatedSourcePath: string): ImportDeclaration[] {
    const parserFilePath = path.join(generatedSourcePath, 'gql-parser.ts');

    if (!FileSystemUtil.fileExists(parserFilePath)) {
      throw new Error('Parser file is not found. Is renaming action completed correctly?');
    }

    const parserFileSourceCode = FileSystemUtil.readFile(parserFilePath);
    const project = new Project();
    const sourceFile = project.createSourceFile('tmp.ts', parserFileSourceCode);

    return sourceFile
      .getImportDeclarations()
      .filter((importDeclaration) => importDeclaration.getModuleSpecifierValue().endsWith('-context'));
  }
}
