import { Service, Inject } from 'typedi';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';

import { Category } from '@src/entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Service()
@Resolver(() => Category)
export class CategoryResolver {
  constructor(@Inject('categoryRepository') private categoryRepository: Repository<Category>) {}

  @Mutation(() => Category)
  public async createCategory(@Arg('data') inputData: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create({
      title: inputData.title,
    });

    const result = await this.categoryRepository.save(category);
    return result;
  }

  @Query(() => [Category])
  public async getCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.tasks', 'task')
      .getMany();
    return categories;
  }
}
