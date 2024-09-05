import { Routes } from '@angular/router';
import { MainTaskComponent } from './components/main-task/main-task.component';
import { TaskComponent } from './components/task/task.component';
import { TaskListComponent } from './components/task-list/task-list.component';

export const routes: Routes = [
  { path: 'main-task', component: MainTaskComponent },
  { path: 'task', component: TaskComponent },
  { path: 'task-list', component: TaskListComponent },
  { path: '', redirectTo: 'task-list', pathMatch: 'full' },
];
