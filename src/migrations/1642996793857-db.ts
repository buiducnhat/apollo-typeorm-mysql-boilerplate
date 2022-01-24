import {MigrationInterface, QueryRunner} from "typeorm";

export class db1642996793857 implements MigrationInterface {
    name = 'db1642996793857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_meta\` ADD \`googleId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_meta\` ADD \`facebookId\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_meta\` DROP COLUMN \`facebookId\``);
        await queryRunner.query(`ALTER TABLE \`user_meta\` DROP COLUMN \`googleId\``);
    }

}
