import { Injectable } from '@angular/core';
import { TaskList } from '../../../../model/TaskList';
import { CrudTaskListService } from '../crud-task-list/crud-task-list.service';
import { Task } from '../../../../model/Task';
import { TaskStateEnum } from '../../../../model/taskStateEnum';

@Injectable({
  providedIn: 'root',
})
export class ByStatusTaskListService {
  public taskList: TaskList;
  private taskListProvider = new CrudTaskListService();

  constructor() {
    this.taskList = this.taskListProvider.get();
  }

  get(state: TaskStateEnum): TaskList {
    let filteredTasks: Task[] = this.taskList.tasks.filter((task) => {
      return task.state === state;
    });

    return new TaskList(filteredTasks);
  }
}
