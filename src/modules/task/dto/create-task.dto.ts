import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class CreateTaskDto {
  @Field()
  public title!: string;

  @Field({ nullable: true })
  public content?: string;

  @Field({ nullable: true })
  public image?: string;

  @Field({ nullable: true })
  public expiredTime?: Date;

  @Field(() => Int)
  public categoryId?: number;
}
