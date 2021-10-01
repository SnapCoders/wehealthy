import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1630873644226 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (process.env.DB_CONNECTION !== 'sqlite') {
      await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    }

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'username',
            type: 'varchar(20)',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar(80)',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar(80)',
            isNullable: false,
          },
          {
            name: 'email_confirmed',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'password_hash',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'security_stamp',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'two_factor_enabled',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'lockout_enabled',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'lockout_expires',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'enabled',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'access_failed_count',
            type: 'integer',
            isNullable: false,
            default: 0,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
