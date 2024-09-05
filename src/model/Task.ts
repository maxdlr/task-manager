import {TaskStateEnum} from "./taskStateEnum";

export class Task {
  public title: string;
  public description: string;
  public state: TaskStateEnum;

  constructor() {
    this.title = 'my task title';
    this.description = 'my task description';
    this.state = TaskStateEnum.IN_PROGRESS;
  }
}
