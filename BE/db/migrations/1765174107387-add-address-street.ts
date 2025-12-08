import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAddressStreet1765174107387 implements MigrationInterface {
    name = 'AddAddressStreet1765174107387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "street" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "street"`);
    }

}
