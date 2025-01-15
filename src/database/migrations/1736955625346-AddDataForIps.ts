import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDataForIps1736955625346 implements MigrationInterface {
  name = 'AddDataForIps1736955625346';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ips"
          ADD "data" jsonb NOT NULL DEFAULT '{}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ips"
        DROP COLUMN "data"`);
  }
}
