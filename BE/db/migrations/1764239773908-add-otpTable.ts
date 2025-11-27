import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOtpTable1764239773908 implements MigrationInterface {
    name = 'AddOtpTable1764239773908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "otp" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "otp" character varying NOT NULL, "expiredAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "otp"`);
    }

}
