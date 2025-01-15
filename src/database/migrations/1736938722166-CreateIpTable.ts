import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIpTable1736938722166 implements MigrationInterface {
  name = 'CreateIpTable1736938722166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ips"
       (
           "ip"        inet      NOT NULL,
           "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
           "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
           "deletedAt" TIMESTAMP,
           CONSTRAINT "PK_bc43b3fea7f8dee9444b68c0400" PRIMARY KEY ("ip")
       )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "ips"`);
  }
}
