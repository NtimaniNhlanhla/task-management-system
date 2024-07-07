import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create(createTaskDto);
    return this.tasksRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.tasksRepository.update(id, updateTaskDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async getDashboard(id: number) {
    const allTasks = await this.tasksRepository.find({ where: { id } });
    const overdueTasks = allTasks.filter(
      (task) => new Date(task.dueDate) < new Date(),
    );
    const outstandingCount = allTasks.length;

    return {
      overdueTasks,
      outstandingCount,
    };
  }

  async searchTasks(id: number, searchQuery: string) {
    return this.tasksRepository.find({
      where: [
        { id, title: Like(`%${searchQuery}%`) },
        { id, description: Like(`%${searchQuery}%`) },
        // Add other fields as necessary
      ],
    });
  }

  async filterTasks(userId: number, filters: any) {
    const query = this.tasksRepository.createQueryBuilder('task');
    query.where('task.userId = :userId', { userId });

    if (filters.dueDate) {
      query.andWhere('task.dueDate = :dueDate', { dueDate: filters.dueDate });
    }
    if (filters.priority) {
      query.andWhere('task.priority = :priority', {
        priority: filters.priority,
      });
    }
    if (filters.status) {
      query.andWhere('task.status = :status', { status: filters.status });
    }

    return query.getMany();
  }
}
