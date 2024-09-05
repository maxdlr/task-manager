import {TaskStateEnum} from "./taskStateEnum";

export class Task {
  public title: string | undefined;
  public description: string | undefined;
  public state: TaskStateEnum | undefined;

  constructor(
    title: string | undefined = undefined,
    description: string | undefined = undefined,
    state: TaskStateEnum | undefined = undefined,
  ) {
    this.title = title;
    this.description = description;
    this.state = state;
  }
}
