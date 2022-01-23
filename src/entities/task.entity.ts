import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { Category } from './category.entity';

export enum TaskStatus {
  PENDING = 'Pending',
  DONE = 'Done',
  EXPIRED = 'Expired',
}

@ObjectType()
@Entity()
export class Task {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Field()
  @Column({ length: 255 })
  public title: string;

  @Field()
  @Column({ type: 'text', nullable: true })
  public content?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public image?: string;

  @Field()
  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
  public status: TaskStatus;

  @Field({ nullable: true })
  @Column({ type: 'datetime', nullable: true })
  public expiredTime?: Date;

  @Field({ nullable: true })
  @Column({ type: 'datetime', nullable: true })
  public completeTime?: Date;

  @Field(() => Category)
  @ManyToOne(() => Category, category => category.tasks)
  public category!: Category;

  @Field(() => Int)
  @RelationId((task: Task) => task.category)
  public categoryId!: number;

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
