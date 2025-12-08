import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAddress1765174399001 implements MigrationInterface {
    name = 'UpdateAddress1765174399001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "province"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "province" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "ward"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "ward" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "ward"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "ward" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "province"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "province" character varying NOT NULL`);
    }

}
