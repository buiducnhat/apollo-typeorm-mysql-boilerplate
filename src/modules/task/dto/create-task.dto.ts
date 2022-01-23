import { Field, InputType } from 'type-graphql';
import { Task } from '@src/entities/task.entity';

@InputType()
export class CreateTaskDto implements Partial<Task> {
  @Field()
  public title!: string;

  @Field({ nullable: true })
  public content?: string;

  @Field({ nullable: true })
  public image?: string;

  @Field({ nullable: true })
  public expiredTime?: Date;

  @Field()
  public categoryId?: number;
}
