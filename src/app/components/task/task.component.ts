import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../model/Task';
import { TaskStateEnum } from '../../../model/taskStateEnum';
import { NgStyle } from '@angular/common';
import { FormatDatePipe } from '../../pipes/date-format/date-format.pipe';
import { ToUpperCasePipe } from '../../pipes/case/to-upper-case.pipe';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NgStyle, FormatDatePipe, FormatDatePipe, ToUpperCasePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  @Input({ required: true }) task!: Task;
  textColorStyle: Record<string, string> = {};

  setTextColorStyle() {
    switch (this.task?.state) {
      case TaskStateEnum.TODO:
        this.textColorStyle = { color: 'red' };
        break;
      case TaskStateEnum.IN_PROGRESS:
        this.textColorStyle = { color: 'blue' };
        break;
      case TaskStateEnum.DONE:
        this.textColorStyle = { color: 'green' };
        break;
    }
  }

  ngOnInit() {
    this.setTextColorStyle();
  }
}
