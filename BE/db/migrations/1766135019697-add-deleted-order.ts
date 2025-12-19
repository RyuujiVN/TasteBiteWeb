import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeletedOrder1766135019697 implements MigrationInterface {
    name = 'AddDeletedOrder1766135019697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "deleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "deleted"`);
    }

}
