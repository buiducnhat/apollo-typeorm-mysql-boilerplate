import { Service, Inject } from 'typedi';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';

import { Task } from '@src/entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Category } from '@src/entities/category.entity';

@Service()
@Resolver(() => Task)
export class TaskResolver {
  constructor(
    @Inject('taskRepository') private taskRepository: Repository<Task>,
    @Inject('categoryRepository') private categoryRepository: Repository<Category>,
  ) {}

  @Mutation(() => Task)
  public async createTask(@Arg('data') inputData: CreateTaskDto): Promise<Task> {
    const category = await this.categoryRepository.findOne(inputData.categoryId);
    if (!category) {
      throw new Error('Category not found');
    }

    const task = this.taskRepository.create({ ...inputData, category });

    const result = await this.taskRepository.save(task);
    return result;
  }

  @Query(() => [Task])
  public async getTasks(): Promise<Task[]> {
    const tasks = await this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.category', 'category')
      .getMany();
    return tasks;
  }
}
