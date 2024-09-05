import { Task } from './Task';

export class TaskList {
  taskList: Task[];

  constructor(taskList: Task[]) {
    this.taskList = taskList;
  }
}
