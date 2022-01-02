import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Category } from './Category';

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

  @Field()
  @Column({ nullable: true })
  public image?: string;

  @Field()
  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
  public status: TaskStatus;

  @Field()
  @Column({ type: 'datetime', nullable: true })
  public expiredTime?: Date;

  @Field()
  @Column({ type: 'datetime', nullable: true })
  public completeTime?: Date;

  @Field(() => Category)
  @ManyToOne(() => Category, category => category.tasks)
  public category!: Category;

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
