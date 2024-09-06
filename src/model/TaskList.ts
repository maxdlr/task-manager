import { Task } from './Task';

export class TaskList {
  tasks: Task[];

  constructor(tasks: Task[]) {
    this.tasks = tasks;
  }

  public add(task: Task) {
    this.tasks.push(task);
  }
}
