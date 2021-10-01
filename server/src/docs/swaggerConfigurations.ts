import swaggerDefinition from '@docs/swagger.json';

import { customCss } from './theme/customCss';

export const definitions = {
  swaggerDefinition,
  apis: [`./${process.env.ENTITIES_ROOT_PATH}/**/*.yaml`],
};

export const options = { customCss };
