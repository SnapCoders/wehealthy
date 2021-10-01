module.exports = {
  name: 'default',
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  entities: [
    `./${process.env.ENTITIES_ROOT_PATH}/modules/**/app/typeorm/entities/*.${process.env.ENTITIES_EXTENSION}`
  ],
  migrations: [
    `./${process.env.ENTITIES_ROOT_PATH}/shared/infra/typeorm/migrations/*.${process.env.ENTITIES_EXTENSION}`
  ],
  cli: { migrationsDir: `./${process.env.ENTITIES_ROOT_PATH}/shared/infra/typeorm/migrations` },
  options: { enableArithAbort: true },
  autoLoadEntities: true,
};
