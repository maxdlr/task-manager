import { Component, OnInit } from '@angular/core';
import { TaskList } from '../../../../model/TaskList';
import { TaskStateEnum } from '../../../../model/taskStateEnum';
import { TaskFacadeService } from '../../facade/task-facade.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  taskListCurrent: TaskList = new TaskList([]);
  taskListArchived: TaskList = new TaskList([]);
  taskFacade: TaskFacadeService = new TaskFacadeService();

  private includeTasksByStatus(status: TaskStateEnum, taskList: TaskList) {
    this.taskFacade.getByStatus(status).subscribe((tasks) => {
      for (const task of tasks.filter((task) => task.state === status)) {
        taskList.add(task);
      }
    });
  }

  ngOnInit(): void {
    this.includeTasksByStatus(TaskStateEnum.TODO, this.taskListCurrent);
    this.includeTasksByStatus(TaskStateEnum.IN_PROGRESS, this.taskListCurrent);
    this.includeTasksByStatus(TaskStateEnum.DONE, this.taskListArchived);
  }
}
