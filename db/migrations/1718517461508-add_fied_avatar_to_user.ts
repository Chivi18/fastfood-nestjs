import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFiedAvatarToUser1718517461508 implements MigrationInterface {
    name = 'AddFiedAvatarToUser1718517461508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`avatar\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`avatar\``);
    }

}
