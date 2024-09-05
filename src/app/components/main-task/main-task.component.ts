import { Component, OnInit } from '@angular/core';
import { Task } from '../../../model/Task';
import { TaskStateEnum } from '../../../model/taskStateEnum';
import { TaskComponent } from '../task/task.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-task',
  standalone: true,
  imports: [CommonModule, TaskComponent],
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
