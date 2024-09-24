import 'common-lib-tomeroko3';
import express from 'express';

import * as controller from './controller';

export const router = express.Router();

router.get('/navigator/:baseFolder', controller.exploreFolders);
router.post('/navigator', controller.createFolder);
router.put('/navigator', controller.renameItem);
router.delete('/navigator', controller.deleteItem);

// validateRequest(addTopic.requestValidation, addTopic.responseValidation),
