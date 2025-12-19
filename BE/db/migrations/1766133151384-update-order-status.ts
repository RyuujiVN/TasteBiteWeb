import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrderStatus1766133151384 implements MigrationInterface {
    name = 'UpdateOrderStatus1766133151384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'Đang xử lý'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "status" DROP DEFAULT`);
    }

}
