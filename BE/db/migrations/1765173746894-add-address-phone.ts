import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAddressPhone1765173746894 implements MigrationInterface {
    name = 'AddAddressPhone1765173746894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "phone" character varying(10) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "phone"`);
    }

}
