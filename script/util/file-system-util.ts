import fs from 'fs';
import path from 'path';
import { type RenameFilePattern } from '../type/rename-file-pattern';

export class FileSystemUtil {
  static removeDirectory(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      return;
    }

    const files = fs.readdirSync(dirPath);

    for (const file of files) {
      const filePath = path.join(dirPath, file);

      if (fs.lstatSync(filePath).isDirectory()) {
        this.removeDirectory(filePath);
      } else {
        fs.unlinkSync(filePath);
      }
    }

    fs.rmdirSync(dirPath);
  }

  static getFileNamesInDirectory(directoryPath: string): string[] {
    const files = fs.readdirSync(directoryPath);
    return files.filter((file) => fs.statSync(path.join(directoryPath, file)).isFile());
  }

  static getFileNamesInDirectoryRecursively(
    dirPath: string,
    knownPaths: string[] = [],
    subDirs: string[] = [],
  ): string[] {
    if (!fs.existsSync(dirPath)) {
      return [];
    }

    const files = fs.readdirSync(dirPath);

    if (files.length === 0) {
      return [];
    }

    for (const file of files) {
      const filePath = path.join(dirPath, file);

      if (fs.lstatSync(filePath).isDirectory()) {
        this.getFileNamesInDirectoryRecursively(`${dirPath}/${file}`, knownPaths, [...subDirs, file]);
      } else {
        knownPaths.push(`${subDirs.join('/')}/${file}`);
      }
    }

    return knownPaths;
  }

  static readFile(filePath: string): string {
    return fs.readFileSync(filePath, 'utf-8');
  }

  static renameFileWithPattern(filePath: string, pattern: RenameFilePattern): void {
    const directory = path.dirname(filePath);
    const oldFileName = path.basename(filePath);
    const newFileName = pattern(oldFileName);
    const oldFilePath = path.join(directory, oldFileName);
    const newFilePath = path.join(directory, newFileName);

    fs.renameSync(oldFilePath, newFilePath);
  }

  static fileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  static removeFile(filePath: string): void {
    fs.unlinkSync(filePath);
  }

  private constructor() {}
}
