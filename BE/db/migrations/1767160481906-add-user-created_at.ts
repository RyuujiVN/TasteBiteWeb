import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserCreatedAt1767160481906 implements MigrationInterface {
    name = 'AddUserCreatedAt1767160481906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "created_at" date NOT NULL DEFAULT ('now'::text)::date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
    }

}
