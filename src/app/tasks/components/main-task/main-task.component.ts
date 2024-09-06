import { Component } from '@angular/core';
import { Task } from '../../../../model/Task';
import { TaskStateEnum } from '../../../../model/taskStateEnum';

@Component({
  selector: 'app-main-task',
  templateUrl: './main-task.component.html',
  styleUrl: './main-task.component.scss',
})
export class MainTaskComponent {
  task: Task = new Task(
    'my new title',
    'my new description',
    TaskStateEnum.IN_PROGRESS,
  );
}
