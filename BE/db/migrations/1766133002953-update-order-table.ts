import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrderTable1766133002953 implements MigrationInterface {
    name = 'UpdateOrderTable1766133002953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "order_id"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "delivery"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "delivery" jsonb NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "order_code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "UQ_3978b8ace86860e3283a839e535" UNIQUE ("order_code")`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "note"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "note" text`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "payment_status" SET DEFAULT 'Chưa thanh toán'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "payment_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "note"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "note" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "UQ_3978b8ace86860e3283a839e535"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "order_code"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "delivery"`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "delivery" jsonb NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "order_id" character varying NOT NULL`);
    }

}
