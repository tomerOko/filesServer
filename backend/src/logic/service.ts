import { File } from 'buffer';
import { functionWrapper } from 'common-lib-tomeroko3';
import fs, { Dirent } from 'fs';

interface Item {
  name: string;
  isDirectory: boolean;
}

export const exploreFolders = async (path: string): Promise<Item[]> => {
  return functionWrapper(async () => {
    try {
      const items: Dirent[] = fs.readdirSync(path, { withFileTypes: true });
      const itemList: Item[] = items.map((item) => ({
        name: item.name,
        isDirectory: item.isDirectory(),
      }));
      return itemList;
    } catch (error) {
      console.error(error);
      return [];
    }
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
    const item = fs.lstatSync(itemPath);
    if (item.isDirectory()) {
      fs.rmdirSync(itemPath, { recursive: true });
    } else {
      fs.unlinkSync(itemPath);
    }
  });
};

//did with copilot
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
