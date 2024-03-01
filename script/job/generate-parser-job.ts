import { type BaseJob } from './base-job';
import { AntlrService } from '../service/antlr-service';
import { RefactorService } from '../service/refactor-service';
import { Service } from 'typedi';

@Service()
export class GenerateParserJob implements BaseJob {
  constructor(
    private readonly antlrService: AntlrService,
    private readonly refactorService: RefactorService,
  ) {}

  execute(): void {
    const outputPath = './module/worker/src/generated';

    this.antlrService.generateParserAndLexer(outputPath);
    this.antlrService.cleanUpAfterGeneration(outputPath);
    this.refactorService.renameGeneratedFilesToKebabCase(outputPath);
    // this.refactorService.refactorParserFile(outputPath);
    // this.refactorService.refactorLexerFile(outputPath);
    // this.refactorService.refactorListenerFile(outputPath);
    // this.refactorService.lintGeneratedFiles(outputPath);
  }
}
