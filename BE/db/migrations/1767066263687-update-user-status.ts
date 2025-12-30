import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserStatus1767066263687 implements MigrationInterface {
    name = 'UpdateUserStatus1767066263687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "status" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
    }

}
