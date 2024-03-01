import {
  type ClassDeclaration,
  type ImportDeclaration,
  type ImportSpecifierStructure,
  type SourceFile,
  StructureKind,
} from 'ts-morph';
import { FilenameUtil } from '../util/filename-util';
import { Service } from 'typedi';

@Service()
export class CodeService {
  putNamedImports(sourceFile: SourceFile, imports: string[], source: string): void {
    const convertedImports = imports.map((importName) => this.getNamedImportDefinition(importName));

    sourceFile.addImportDeclaration({
      namedImports: [...convertedImports],
      moduleSpecifier: source,
    });
  }

  putNamedImport(sourceFile: SourceFile, importName: string, basePath: string): void {
    const convertedImport = this.getNamedImportDefinition(importName);
    const fileName = FilenameUtil.convertToKebabCase(importName);

    sourceFile.addImportDeclaration({
      namedImports: [convertedImport],
      moduleSpecifier: `${basePath}/${fileName}`.replace('//', '/'),
    });
  }

  putImportDeclaration(sourceFile: SourceFile, importDeclaration: ImportDeclaration): void {
    const moduleSpecifier = importDeclaration.getModuleSpecifierValue();

    const namedImports = importDeclaration.getNamedImports().map((namedImport) => ({
      name: namedImport.getName(),
    }));

    sourceFile.addImportDeclaration({ namedImports, moduleSpecifier });
  }

  extractClassSourceCode(sourceFile: SourceFile, className: string): string {
    const declaration = sourceFile.getClass(className);

    if (declaration === undefined) {
      throw new Error(`Attempt to extract code from unknown class: ${className}`);
    }

    return this.extractClassSourceCodeFromDeclaration(declaration);
  }

  extractClassSourceCodeFromDeclaration(declaration: ClassDeclaration): string {
    let sourceCode = declaration.getFullText() ?? '';
    sourceCode = sourceCode.replace(/public /g, '');
    sourceCode = sourceCode.replace(/export default/g, 'export');
    return sourceCode;
  }

  private getNamedImportDefinition(importName: string): ImportSpecifierStructure {
    return {
      name: importName,
      kind: StructureKind.ImportSpecifier,
    };
  }
}
