import {MigrationInterface, QueryRunner} from "typeorm";

export class db1643012146386 implements MigrationInterface {
    name = 'db1643012146386'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
    }

}
