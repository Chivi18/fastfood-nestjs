import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSomeField1718251608418 implements MigrationInterface {
    name = 'AddSomeField1718251608418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`id_user\` \`id_user\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`id_user\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`refresh_token\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`refresh_token\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`id_user\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD PRIMARY KEY (\`id_user\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`id_user\` \`id_user\` int NOT NULL AUTO_INCREMENT`);
    }

}
