import { Router } from 'express';

import { usersRouter } from '@modules/users/app/http/routes/users.routes';

const routes = Router();

routes.use('/users', usersRouter);

routes.get('/', (_, response) => response.redirect('/api/docs/swagger.json'));

export { routes };
