import { File } from 'buffer';
import { AppError, functionWrapper, getAuthenticatedID } from 'common-lib-tomeroko3';
import fs from 'fs';

import { appErrorCodes } from './appErrorCodes';

export const exploreFolders = async (path: string): Promise<string[]> => {
  return functionWrapper(async () => {
    const items = fs.readdirSync(path, { withFileTypes: true });
    const folderNames = items.filter((item) => item.isDirectory()).map((item) => item.name);
    const fileNames = items.filter((item) => item.isFile()).map((item) => item.name);
    return [...folderNames, ...fileNames];
  });
};

export const createFolder = async (path: string, folderName: string): Promise<void> => {
  return functionWrapper(async () => {
    fs.mkdirSync(`${path}/${folderName}`);
  });
};

export const renameItem = async (path: string, itemName: string, newName: string): Promise<void> => {
  return functionWrapper(async () => {
    const itemPath = `${path}/${itemName}`;
    const newItemPath = `${path}/${newName}`;
    fs.renameSync(itemPath, newItemPath);
  });
};

export const deleteItem = async (path: string, itemName: string): Promise<void> => {
  return functionWrapper(async () => {
    const itemPath = `${path}/${itemName}`;
    fs.unlinkSync(itemPath);
  });
};

export const uploadFile = async (path: string, file: File): Promise<void> => {
  return functionWrapper(async () => {
    const filePath = `${path}/${file.name}`;
    const fileStream = fs.createWriteStream(filePath);

    return new Promise<void>((resolve, reject) => {
      const reader = file.stream().getReader();
      const write = async () => {
        const { done, value } = await reader.read();
        if (done) {
          fileStream.end(() => resolve());
          return;
        }
        if (!fileStream.write(value)) {
          fileStream.once('drain', write);
        } else {
          write();
        }
      };

      write();

      fileStream.on('error', (error) => {
        reject(`Error writing file: ${error.message}`);
      });
    });
  });
};
