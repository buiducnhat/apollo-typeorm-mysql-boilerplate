import { Service, Inject } from 'typedi';
import { Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';

import { Category } from '@src/entities/category.entity';

@Service()
@Resolver(() => Category)
export class GetCategories {
  constructor(@Inject('categoryRepository') private categoryRepository: Repository<Category>) {}

  @Query(() => [Category])
  public async getCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.tasks', 'task')
      .getMany();
    return categories;
  }
}
