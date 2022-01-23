import { Service, Inject } from 'typedi';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';

import { Task, TaskStatus } from '@src/entities/task.entity';
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
      console.log('error: category not found');
    }

    const task = new Task();
    task.title = inputData.title;
    task.content = inputData.content;
    task.status = TaskStatus.PENDING;
    task.expiredTime = inputData.expiredTime;
    task.image = inputData.image;
    task.category = category;

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
