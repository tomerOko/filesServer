import { nodeEnvironments } from 'common-lib-tomeroko3';
import { config } from 'dotenv';

import { envsValidation } from './ENVsValidation';
import { envsMock } from './envMock';

let unsafeENVs: Record<string, string | undefined>;
if ([nodeEnvironments.EXTERANL_DEV, nodeEnvironments.EXTERNAL_TEST].includes(process.env.NODE_ENV as any)) {
  config({ path: './external_development.env' });
  unsafeENVs = process.env;
} else {
  // TODO: use real envs (in k8s the way to set envs is through config maps and secrets, in local development we can use .env files) so enyway we will use process.env eventually, but we will only load .env files in the external dev environment
  unsafeENVs = envsMock;
}

const validatedENVs = envsValidation(unsafeENVs);

export const ENVs = {
  env: validatedENVs.NODE_ENV || nodeEnvironments.DEV,
  port: validatedENVs.PORT || 3000,
  serviceName: validatedENVs.SERVICE_NAME,
};
