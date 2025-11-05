import {Worker, type Job} from 'bullmq';
import {redis} from '../redis';
import taskJob from '../jobs/task.job';

const IS_DEBUG_ENABLED = true;
const QUEUE_NAME = 'tasks';

export default async function listenToTasks() {
  const worker = new Worker(QUEUE_NAME, taskJob, {
    connection: redis,
  });

  if (IS_DEBUG_ENABLED) {
    worker.on('ready', () => {
      console.log('Task worker is ready');
    });

    worker.on('active', (job: Job) => {
      console.log(`Processing task job #${job.id} with name ${job.name}`);
    });

    worker.on('completed', (job: Job, result: unknown) => {
      console.log(`Completed task job #${job.id} with name ${job.name}. Result:`, result);
    });
  }

  worker.on('failed', (job: Job | undefined, err: Error) => {
    if (job) {
      console.error(`Task job #${job.id} with name ${job.name} failed. Error:`, err);
    } else {
      console.error('A task job failed before it could be processed. Error:', err);
    }
  });

  worker.on('error', (err: Error) => {
    console.error('Worker error:', err);
  });

  return worker;
}
