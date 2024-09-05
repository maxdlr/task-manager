import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../../model/Task";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
  @Input({required: true}) task: Task;

  constructor() {
    this.task = new Task();
  }

  ngOnInit() {
  }
}
