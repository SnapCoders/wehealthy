import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUserAppointments1634694914969 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (process.env.DB_CONNECTION !== 'sqlite') {
      await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    }

    await queryRunner.createTable(
      new Table({
        name: 'users_appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'appointment_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'associated_at',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
