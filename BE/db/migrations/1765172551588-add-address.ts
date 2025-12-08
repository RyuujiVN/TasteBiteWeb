import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAddress1765172551588 implements MigrationInterface {
    name = 'AddAddress1765172551588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "full_name" character varying(50) NOT NULL, "province" character varying NOT NULL, "ward" character varying NOT NULL, "is_default" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
