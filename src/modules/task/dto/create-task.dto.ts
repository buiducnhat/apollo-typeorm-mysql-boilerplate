import { Field, InputType } from 'type-graphql';
import { Task } from '@src/entities/Task';

@InputType()
export class CreateTaskDto implements Partial<Task> {
  @Field()
  public title!: string;

  @Field()
  public content?: string;

  @Field()
  public image?: string;

  @Field()
  public expiredTime?: Date;
}
