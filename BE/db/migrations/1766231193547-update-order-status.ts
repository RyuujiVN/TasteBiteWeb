import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrderStatus1766231193547 implements MigrationInterface {
    name = 'UpdateOrderStatus1766231193547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "payment_status" SET DEFAULT 'UNPAID'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "payment_status" SET DEFAULT 'Chưa thanh toán'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'Đang xử lý'`);
    }

}
