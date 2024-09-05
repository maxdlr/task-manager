import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskList } from '../../model/TaskList';
import { Task } from '../../model/Task';
import { TaskStateEnum } from '../../model/taskStateEnum';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  taskList: TaskList = new TaskList([]);
  private taskStates = Object.values(TaskStateEnum);

  private makeRandomTasks = (number: number): void => {
    let tasks: Task[] = [];
    for (let i = 0; i < number; i++) {
      tasks.push(
        new Task(
          `title ${i}`,
          `description ${i}`,
          this.taskStates[Math.floor(this.taskStates.length * Math.random())],
        ),
      );
    }
    this.taskList.taskList = tasks;
  };

  ngOnInit(): void {
    this.makeRandomTasks(10);
  }

  protected readonly TaskStateEnum = TaskStateEnum;
}
