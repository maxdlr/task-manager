import { Component, OnInit } from '@angular/core';
import { TaskList } from '../../../../model/TaskList';
import { TaskStateEnum } from '../../../../model/taskStateEnum';
import { ByStatusTaskListService } from '../../services/by-status-task-list/by-status-task-list.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  taskListCurrent: TaskList = new TaskList([]);
  taskListArchived: TaskList = new TaskList([]);
  taskListByStatusProvider: ByStatusTaskListService =
    new ByStatusTaskListService();

  ngOnInit(): void {
    this.taskListCurrent.tasks = [
      ...this.taskListByStatusProvider.get(TaskStateEnum.TODO).tasks,
      ...this.taskListByStatusProvider.get(TaskStateEnum.IN_PROGRESS).tasks,
    ];
    this.taskListArchived = this.taskListByStatusProvider.get(
      TaskStateEnum.DONE,
    );
  }
}
