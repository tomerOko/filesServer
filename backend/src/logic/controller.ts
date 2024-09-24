import { errorHandler, functionWrapper } from 'common-lib-tomeroko3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import * as service from './service';

export const test = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      res.send('Test route');
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const exploreFolders = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const { baseFolder } = req.params;
      const baseFolderDecoded = decodeURIComponent(baseFolder);
      const result = await service.exploreFolders(baseFolderDecoded);
      res.send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const createFolder = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const { path, folderName } = req.body;
      const result = await service.createFolder(path, folderName);
      res.send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const renameItem = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const { baseFolder, itemName, newName } = req.body;
      const result = await service.renameItem(baseFolder, itemName, newName);
      res.send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const { baseFolder, itemName } = req.body;
      const result = await service.deleteItem(baseFolder, itemName);
      res.send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};
