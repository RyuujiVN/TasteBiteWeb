import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProductPrice1765446568799 implements MigrationInterface {
    name = 'UpdateProductPrice1765446568799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "price" TYPE numeric(10,0)`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "new_price" TYPE numeric(10,0)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "new_price" TYPE numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "price" TYPE numeric(10,2)`);
    }

}
