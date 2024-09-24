import 'common-lib-tomeroko3';
import 'common-lib-tomeroko3';
import express from 'express';

import * as controller from './controller';

export const router = express.Router();

router.get('/test', controller.test);
router.get('/explorer/:baseFolder', controller.exploreFolders);
router.post('/explorer', controller.createFolder);
router.put('/explorer', controller.renameItem);
router.delete('/explorer', controller.deleteItem);

// validateRequest(addTopic.requestValidation, addTopic.responseValidation),
