import {Component, OnInit} from '@angular/core';
import {Task} from "../../model/Task";
import {TaskStateEnum} from "../../model/taskStateEnum";
import {TaskComponent} from "../task/task.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-main-task',
  standalone: true,
  imports: [CommonModule, TaskComponent],
  templateUrl: './main-task.component.html',
  styleUrl: './main-task.component.scss'
})
export class MainTaskComponent implements OnInit {
  task: Task = new Task();

  ngOnInit() {
    this.task.title = 'my new title';
    this.task.description = 'my new description';
    this.task.state = TaskStateEnum.IN_PROGRESS;
  }
}
