import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class userAppointments1634695028784 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'users_appointments',
      new TableForeignKey({
        name: 'fk_users_appointments__appointment_id',
        columnNames: ['appointment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'appointments',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
    await queryRunner.createForeignKey(
      'users_appointments',
      new TableForeignKey({
        name: 'fk_users_appointments__user_id',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'users_appointments',
      'fk_users_appointments__appointment_id',
    );
    await queryRunner.dropForeignKey(
      'users_appointments',
      'fk_users_appointments__user_id',
    );
  }
}
