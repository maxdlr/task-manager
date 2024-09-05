import {Routes} from '@angular/router';
import {MainTaskComponent} from "./main-task/main-task.component";
import {TaskComponent} from "./task/task.component";

export const routes: Routes = [
  {path: "main-task", component: MainTaskComponent},
  {path: "task", component: TaskComponent},
];
