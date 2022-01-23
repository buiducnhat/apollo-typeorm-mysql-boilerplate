import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  RelationId,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { UserMeta } from './user-meta.entity';
import { Task } from './task.entity';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Field()
  @Column({ length: 100 })
  public firstName!: string;

  @Field()
  @Column({ length: 100 })
  public lastName!: string;

  @Field()
  @Column()
  public email: string;

  @Field({ nullable: true })
  @Column({ length: 15, nullable: true })
  public phone?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public avatar?: string;

  @Field()
  @Column()
  public password: string;

  @Field(() => UserMeta)
  @OneToOne(() => UserMeta, meta => meta.user)
  public meta!: UserMeta;
  @RelationId((user: User) => user.meta)
  public metaId!: number;

  @Field(() => [Task], { nullable: true })
  @OneToMany(() => Task, task => task.user)
  tasks?: Task[];

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
