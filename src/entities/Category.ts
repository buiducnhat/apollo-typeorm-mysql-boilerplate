import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Task } from './Task';

@ObjectType()
@Entity()
export class Category {
  @Field()
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @Field()
  @Column({ length: 255 })
  public title!: string;

  @Field()
  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP(6)' })
  public readonly createdAt!: Date;

  @Field(() => [Task])
  @OneToMany(() => Task, task => task.category)
  public tasks?: Task[];

  @Field()
  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public readonly updatedAt!: Date;
}
