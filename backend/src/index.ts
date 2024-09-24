import { initializeCommonUtils, nodeEnvironments } from 'common-lib-tomeroko3';
import 'tsconfig-paths/register';

import { ENVs } from './configs/ENVs';

import { initializeServer } from './server';

const start = async () => {
  console.log('Starting server...');

  initializeCommonUtils({
    IS_PROD: process.env.NODE_ENV == nodeEnvironments.PROD,
    JWT_SECRET: 'notSoSecret',
    SERVICE_NAME: 'TEACH_SERVICE',
  });

  await initializeServer();
};

start();
