import { MigrationInterface, QueryRunner } from "typeorm";

export class SetDefaultValRefreshToken1718354567901 implements MigrationInterface {
    name = 'SetDefaultValRefreshToken1718354567901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NOT NULL`);
    }

}
