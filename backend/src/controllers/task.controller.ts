import {JsonController, Get, Param, Put, Post, Delete, Body} from 'routing-controllers';
import {redis} from "../redis.js";
import {TaskRepository} from "../repositories/TaskRepository.js";
import {CreateTaskDTO, TaskID} from "../types/task.js";

@JsonController('/task')
export class TaskController {
  @Post('/:id')
  async create(@Body() data: CreateTaskDTO) {
    redis.publish('task:create', JSON.stringify(data));
  }

  @Get('/:id')
  async read(@Param('id') id: TaskID) {
    return await TaskRepository.findById(id)
  }

  @Put('/:id')
  async update(@Param('id') id: TaskID, @Body() data: Partial<CreateTaskDTO>) {
    redis.publish('task:update', JSON.stringify({id, data}));
  }

  @Delete('/:id')
  async delete(@Param('id') id: TaskID) {
    redis.publish('task:delete', id);
  }
}
