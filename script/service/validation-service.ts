import fs from 'fs';
import { Service } from 'typedi';

@Service()
export class ValidationService {
  validateEnvironment(): void {
    this.checkANTLR4Bin();
  }

  private checkANTLR4Bin(): void {
    console.log('Checking ANTLR4 binary...');

    if (fs.existsSync('bin/antlr4.jar')) {
      return;
    }

    throw new Error('ANTLR4 binary is missing!');
  }
}
