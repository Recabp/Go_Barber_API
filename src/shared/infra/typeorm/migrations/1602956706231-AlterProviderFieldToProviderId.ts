import {
  MigrationInterface, QueryRunner, TableColumn, TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1602953470945
implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'professional');
    await queryRunner.addColumn('appointments',
      new TableColumn({
        name: 'professional_id',
        type: 'uuid',
        isNullable: true,
      }));
    await queryRunner.createForeignKey('appointments', new TableForeignKey({
      name: 'AppointmentProfessional',
      columnNames: ['professional_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProfessional');

    await queryRunner.dropColumn('appointments', 'professional_id');

    await queryRunner.addColumn('appointments', new TableColumn({
      name: 'professional',

      type: 'varchar',
    }));
  }
}
