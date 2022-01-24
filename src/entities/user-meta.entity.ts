import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';

import { User } from './user.entity';

export enum UserRole {
  ADMIN = 'Admin',
  MODERATOR = 'Moderator',
  NORMAL = 'Normal',
}

@ObjectType()
@Entity()
export class UserMeta {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Field(() => String)
  @Column({ type: 'enum', enum: UserRole, default: UserRole.NORMAL })
  public role!: UserRole;

  @Field()
  @Column({ default: false })
  public isVerifiedEmail!: boolean;

  @Field()
  @Column({ default: false })
  public isVerifiedPhone!: boolean;

  @Field(() => User)
  @OneToOne(() => User, user => user.meta)
  public user!: User;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public googleId?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public facebookId?: string;

  @Field()
  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP(6)' })
  public readonly createdAt: Date;

  @Field()
  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public readonly updatedAt: Date;
}
