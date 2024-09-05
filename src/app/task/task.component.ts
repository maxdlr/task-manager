import {Component, OnInit} from '@angular/core';
import {TaskStateEnum} from "../../model/taskStateEnum";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {

  title: string | undefined = undefined
  description: string | undefined = undefined
  state: TaskStateEnum | undefined = undefined

  constructor() {
    this.title = 'my task title';
    this.description = 'my task description';
    this.state = TaskStateEnum.IN_PROGRESS;
  }

  ngOnInit() {
  }
}
