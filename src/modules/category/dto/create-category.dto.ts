import { Field, InputType } from 'type-graphql';
import { Category } from '@src/entities/category.entity';

@InputType()
export class CreateCategoryDto implements Partial<Category> {
  @Field()
  public title!: string;
}
