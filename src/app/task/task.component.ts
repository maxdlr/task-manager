import {Component, OnInit} from '@angular/core';
import {TaskStateEnum} from "../../model/taskStateEnum";
import {Task} from "../../model/Task";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
  task: Task | undefined = undefined;

  ngOnInit() {
    this.task = new Task();
  }
}
