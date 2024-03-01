import { execSync } from 'child_process';
import { Service } from 'typedi';
import { FileSystemUtil } from '../util/file-system-util';
import path from 'path';

const antlrClasses: string[] = [
  'ATN',
  'ATNDeserializer',
  'CharStream',
  'DecisionState',
  'DFA',
  'DFABuilder',
  'FailedPredicateException',
  'RecognitionException',
  'NoViableAltException',
  'BailErrorStrategy',
  'Parser',
  'ParserATNSimulator',
  'RuleContext',
  'ParserRuleContext',
  'PredictionMode',
  'PredictionContextCache',
  'TerminalNode',
  'RuleNode',
  'Token',
  'TokenStream',
  'Interval',
  'IntervalSet',
  'Lexer',
  'LexerATNSimulator',
  'ParseTreeListener',
  'SharedToken',
  'ATNNumber',
];

const antlrClassesToRegExp: Record<string, RegExp> = [...antlrClasses].reduce(
  (acc, className) => ({ ...acc, [className]: new RegExp(`\\b${className}\\b`, 'g') }),
  {},
);

@Service()
export class AntlrService {
  generateParserAndLexer(outputDir: string): void {
    console.log('Generating parser and lexer with usage of ANTLR4...');

    const antlr4Bin = './bin/antlr4.jar';
    const lexerFile = './tmp/GQLLexer.g4';
    const parserFile = './tmp/GQLParser.g4';
    const command = `java -jar ${antlr4Bin} -Dlanguage=JavaScript -o ${outputDir} ${lexerFile} -o ${outputDir} ${parserFile}`;

    FileSystemUtil.removeDirectory(outputDir);

    execSync(command);
  }

  cleanUpAfterGeneration(outputDir: string): void {
    FileSystemUtil.getFileNamesInDirectory(outputDir)
      .filter((fileName) => fileName.endsWith('.interp') || fileName.endsWith('.tokens'))
      .map((fileName) => path.join(outputDir, fileName))
      .forEach((filePath) => {
        FileSystemUtil.removeFile(filePath);
      });
  }

  getClassesUsedInSource(sourceCode: string, className: string): string[] {
    return [...antlrClasses]
      .filter((antlrClass) => sourceCode.match(antlrClassesToRegExp[antlrClass]) !== null)
      .filter((antlrClass) => antlrClass !== className);
  }
}
