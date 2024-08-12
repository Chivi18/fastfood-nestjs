import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1718250836947 implements MigrationInterface {
    name = 'CreateUserTable1718250836947'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`firstName\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`lastName\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`id_user\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`first_Name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`last_Name\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`last_Name\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`first_Name\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`id_user\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`lastName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`firstName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
    }

}
