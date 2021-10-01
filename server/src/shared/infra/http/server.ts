import { createAdminBro } from '@config/adminBro';

import { app } from './app';

async function admin() {
  const { rootPath, router } = await createAdminBro();

  app.use(rootPath, router);
}

admin();

app.listen(process.env.PORT, () => {
  console.info(`🚀 Server started on port ${process.env.PORT}!`);
});
