import { TaskStateEnum } from './taskStateEnum';

export class Task {
  public id: number;
  public title: string;
  public description: string;
  public state: TaskStateEnum;
  public creationDate: Date = new Date();

  constructor(title: string, description: string, state: TaskStateEnum) {
    this.id = Math.random();
    this.title = title;
    this.description = description;
    this.state = state;
  }
}
