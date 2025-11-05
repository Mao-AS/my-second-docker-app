import type {Job} from 'bullmq';
import {TaskRepository} from "../repositories/TaskRepository";
import {CreateTaskDTO, Task, TaskID, UpdateTaskDTO} from "../types/task.js";

export default async function taskJob(job: Job<CreateTaskDTO | UpdateTaskDTO | TaskID>) {
  switch (job.name) {
    case 'task:create': {
      const data = job.data as CreateTaskDTO;

      await TaskRepository.create(data);

      return `Task created with data: ${JSON.stringify(data)}`;
    }

    case 'task:update': {
      const {id, ...data} = job.data as Task;

      await TaskRepository.update(id, data as UpdateTaskDTO);

      return `Task with ID ${id} updated with data: ${JSON.stringify(data)}`;
    }

    case 'task:delete': {
      const id = job.data as TaskID;

      await TaskRepository.delete(id);

      return `Task with ID ${id} deleted`;
    }

    default:
      throw new Error(`Unknown job name: ${job.name}`);
  }
}
