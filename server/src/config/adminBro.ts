import AdminBroExpress from '@admin-bro/express';
import { Database, Resource } from '@admin-bro/typeorm';
import AdminBro from 'admin-bro';
import { Router } from 'express';

import { connect } from '@shared/infra/typeorm';

AdminBro.registerAdapter({ Database, Resource });

interface IResponse {
  rootPath: string;
  router: Router;
}

export async function createAdminBro(): Promise<IResponse> {
  const connection = await connect();

  const adminBro = new AdminBro({
    databases: [connection],
    rootPath: '/admin',
  });

  const router = AdminBroExpress.buildRouter(adminBro);

  return { rootPath: adminBro.options.rootPath, router };
}
