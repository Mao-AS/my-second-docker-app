import {JsonController, Get, Param, Put, Post, Delete} from 'routing-controllers';
import {TaskRepository} from "../repositories/TaskRepository.js";
import {TaskID} from "../types/task.js";

@JsonController('/tasks')
export class TasksController {
  @Get('/')
  async readAll() {
    return await TaskRepository.findAll()
  }
}
