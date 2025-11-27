import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteUserActiveAndToken1764235119261
  implements MigrationInterface
{
  name = 'DeleteUserActiveAndToken1764235119261';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "token_active"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_active"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "is_active" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "token_active" text`);
  }
}
