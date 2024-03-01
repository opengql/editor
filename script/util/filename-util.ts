import path from 'path';

const kebabCasePattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const pascalCasePattern = /^[A-Z][a-zA-Z0-9]*$/;

export class FilenameUtil {
  static convertToKebabCase(fileName: string): string {
    const extension = path.extname(fileName);
    const baseName = path.basename(fileName, extension);
    const kebabCaseName = baseName.replace(/(GQL)|[A-Z]/g, (match) => `-${match.toLowerCase()}`);
    const kebabCaseBaseName = kebabCaseName.replace(/^-/, '').toLowerCase();
    return `${kebabCaseBaseName}${extension}`;
  }

  static isKebabCase(fileName: string): boolean {
    return kebabCasePattern.test(fileName);
  }

  static isPascalCase(inputString: string): boolean {
    return pascalCasePattern.test(inputString);
  }
}
