import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createTaskDto: CreateTaskDto) {
    const userId = req.user.id;
    return this.tasksService.create(userId, createTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    return this.tasksService.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.tasksService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.tasksService.delete(id);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('dashboard')
  // async getDashboard(@Request() req) {
  //   const userId = req.user.id;
  //   return this.tasksService.getDashboard(userId);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('search')
  // async searchTasks(@Request() req, @Query('q') searchQuery: string) {
  //   const userId = req.user.id;
  //   return this.tasksService.searchTasks(userId, searchQuery);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('filter')
  // async filterTasks(@Request() req, @Query() filters: any) {
  //   const userId = req.user.id;
  //   return this.tasksService.filterTasks(userId, filters);
  // }
}
