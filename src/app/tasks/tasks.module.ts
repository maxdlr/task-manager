import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './components/task/task.component';
import { MainTaskComponent } from './components/main-task/main-task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { FormatDatePipe } from '../pipes/date-format/date-format.pipe';
import { ToUpperCasePipe } from '../pipes/case/to-upper-case.pipe';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  declarations: [
    TaskComponent,
    MainTaskComponent,
    TaskListComponent,
    FormatDatePipe,
    ToUpperCasePipe,
  ],
  imports: [CommonModule, TasksRoutingModule],
})
export class TasksModule {}
