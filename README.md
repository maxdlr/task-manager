# Task Manager - Angular practice

### Lancer l'application
- Node version 22.2.0
- NPM version 10.8.1
- Angular version 18 
- Angular-CLI version 18.2.3

### Outillage
- Compodoc version: 1.1.25
- Yarn version: 1.22.22
- Lancer l'application: ng serve

### Component task
> task.component.ts
```ts
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
```
> task.component.html
```html

<h1>
  {{ task.title }}
</h1>
<p>
  {{ task.description }}
</p>
<footer>
  {{ task.state }}
</footer>
```
> model/Task.ts
```ts
export class Task {
  public title: string;
  public description: string;
  public state: TaskStateEnum;

  constructor() {
    this.title = 'my task title';
    this.description = 'my task description';
    this.state = TaskStateEnum.IN_PROGRESS;
  }
}
```
> model/taskStateEnum.ts
```ts
export enum TaskStateEnum {
  TODO = 'A faire',
  IN_PROGRESS = 'En cours',
  DONE = 'Terminé',
}
```

### Smart and Dump Components
> app.routes.ts
```ts
import {Routes} from '@angular/router';
import {MainTaskComponent} from "./main-task/main-task.component";
import {TaskComponent} from "./task/task.component";

export const routes: Routes = [
  {path: "main-task", component: MainTaskComponent},
  {path: "task", component: TaskComponent},
];
```
> main-task.component.html
```html
<app-task [task]="task"/>
```
> main-task.component.ts
```ts
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
```
> task.component.ts
```ts
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
}
```

### Directives

> app.routes.ts
```ts
import { Routes } from '@angular/router';
import { MainTaskComponent } from './main-task/main-task.component';
import { TaskComponent } from './task/task.component';
import { TaskListComponent } from './task-list/task-list.component';

export const routes: Routes = [
  { path: 'main-task', component: MainTaskComponent },
  { path: 'task', component: TaskComponent },
  { path: 'task-list', component: TaskListComponent },
];
```
> task-list.component.html
```html
@for (task of taskList.taskList; track task.title) {
  <app-task
    [task]="task"
  />
}
```
> task-list.component.ts
```ts
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
```
> task.component.html
```html
<div [ngStyle]="textColorStyle">
  <h1>
    {{ task.title }}
  </h1>
  <p>
    {{ task.description }}
  </p>
  <footer>
    {{ task.state }}
  </footer>
</div>
```
> task.component.ts
```ts
import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../model/Task';
import { TaskStateEnum } from '../../model/taskStateEnum';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  @Input({ required: true }) task!: Task;
  textColorStyle: Record<string, string> = {};

  setTextColorStyle() {
    switch (this.task.state) {
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

  constructor() {
    this.task = new Task();
  }

  ngOnInit() {
    this.setTextColorStyle();
  }
}
```
> model/TaskList.ts
```ts
import { Task } from './Task';

export class TaskList {
  taskList: Task[];

  constructor(taskList: Task[]) {
    this.taskList = taskList;
  }
}
```

### Pipes
> app.routes.ts
```ts
import { Routes } from '@angular/router';
import { MainTaskComponent } from './components/main-task/main-task.component';
import { TaskComponent } from './components/task/task.component';
import { TaskListComponent } from './components/task-list/task-list.component';

export const routes: Routes = [
  { path: 'main-task', component: MainTaskComponent },
  { path: 'task', component: TaskComponent },
  { path: 'task-list', component: TaskListComponent },
];
```
> main-task.component.ts
```ts
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
```
> task.component.html
```html
<div [ngStyle]="textColorStyle">
  <h1>
    {{ task.title | toUpperCase: true }}
  </h1>
  <p><small>{{ task.creationDate | formatDate }}</small></p>
  <p>
    {{ task.description }}
  </p>
  <footer>
    Status: {{ task.state }}
  </footer>
</div>
```
> to-upper-case.pipe.ts
```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toUpperCase',
  standalone: true,
})
export class ToUpperCasePipe implements PipeTransform {
  transform(value: string, title: boolean = false): string {
    let newValue = value.toUpperCase();

    if (title) newValue = value.charAt(0).toUpperCase() + value.substring(1);

    return newValue;
  }
}
```
> date-format.pipe.ts
```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
  standalone: true,
})
export class FormatDatePipe implements PipeTransform {
  private toTwoDigits = (number: number): string | number =>
    number.toString().length < 2 ? '0' + number : number;

  transform(value: Date): string {
    const day = this.toTwoDigits(value.getDate());
    const month = this.toTwoDigits(value.getMonth());
    const year = this.toTwoDigits(value.getFullYear());

    return `${day}/${month}/${year}`;
  }
}
```
> model/Task.ts
```ts
import { TaskStateEnum } from './taskStateEnum';

export class Task {
  public title: string;
  public description: string;
  public state: TaskStateEnum;
  public creationDate: Date = new Date();

  constructor(title: string, description: string, state: TaskStateEnum) {
    this.title = title;
    this.description = description;
    this.state = state;
  }
}
```

### Router
> app.routes.ts
```ts
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
```

### Task Module / Lazy Loading
> app.routes.ts
```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'display',
    loadChildren: () =>
      import('./tasks/tasks.module').then((m) => m.TasksModule),
  },
];
```
> app/tasks/tasks-routing.module.ts
```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';

const routes: Routes = [{ path: '', component: TaskListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
```
> app/tasks/tasks.module.ts
```ts
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
```

### Services
> package.json
```json
...
"@faker-js/faker": "^9.0.0",
...
```
> app/tasks/components/task-list/task-list.component.html
```html
<div style="padding: 0 30px">
  <h1>Tâches</h1>
</div>
<div style="border: black solid 1px; padding: 30px; border-radius: 40px;">
  <h2>Tâches actuelles</h2>
  @for (task of taskListCurrent.tasks; track task.title) {
    <app-task
      [task]="task"
    />
    <hr>
  }
</div>
<div style="border: black solid 1px; padding: 30px; border-radius: 40px;">
  <h2>Tâches terminées</h2>
  @for (task of taskListArchived.tasks; track task.title) {
    <app-task
      [task]="task"
    />
    <hr>
  }
</div>
```
> task-list.component.ts
```ts
import { Component, OnInit } from '@angular/core';
import { TaskList } from '../../../../model/TaskList';
import { TaskStateEnum } from '../../../../model/taskStateEnum';
import { ByStatusTaskListService } from '../../services/by-status-task-list/by-status-task-list.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})

export class TaskListComponent implements OnInit {
  taskListCurrent: TaskList = new TaskList([]);
  taskListArchived: TaskList = new TaskList([]);
  taskListByStatusProvider: ByStatusTaskListService =
    new ByStatusTaskListService();

  ngOnInit(): void {
    this.taskListCurrent.tasks = [
      ...this.taskListByStatusProvider.get(TaskStateEnum.TODO).tasks,
      ...this.taskListByStatusProvider.get(TaskStateEnum.IN_PROGRESS).tasks,
    ];
    this.taskListArchived = this.taskListByStatusProvider.get(
      TaskStateEnum.DONE,
    );
  }
}
```
> app/tasks/services/by-status-task-list/by-status-task-list.service.ts
```ts
import { Injectable } from '@angular/core';
import { TaskList } from '../../../../model/TaskList';
import { CrudTaskListService } from '../crud-task-list/crud-task-list.service';
import { Task } from '../../../../model/Task';
import { TaskStateEnum } from '../../../../model/taskStateEnum';

@Injectable({
  providedIn: 'root',
})
export class ByStatusTaskListService {
  public taskList: TaskList;
  private taskListProvider = new CrudTaskListService();

  constructor() {
    this.taskList = this.taskListProvider.get();
  }

  get(state: TaskStateEnum): TaskList {
    let filteredTasks: Task[] = this.taskList.tasks.filter((task) => {
      return task.state === state;
    });

    return new TaskList(filteredTasks);
  }
}
```
> services/crud-task-list/crud-task-list.service.ts
```ts
import { Injectable } from '@angular/core';
import { TaskList } from '../../../../model/TaskList';
import { Task } from '../../../../model/Task';
import { TaskStateEnum } from '../../../../model/taskStateEnum';
import { faker } from '@faker-js/faker';

@Injectable({
  providedIn: 'root',
})
export class CrudTaskListService {
  private taskList!: TaskList;

  constructor() {
    this.generateRandomTasks(20);
  }

  private generateRandomTasks = (number: number): void => {
    const taskStates = Object.values(TaskStateEnum);
    let tasks: Task[] = [];
    for (let i = 0; i < number; i++) {
      tasks.push(
        new Task(
          faker.food.fruit(),
          faker.word.words(20),
          taskStates[Math.floor(taskStates.length * Math.random())],
        ),
      );
    }
    this.taskList = new TaskList(tasks);
  };

  create(tasks: Task[]): void {
    for (const task of tasks) {
      this.taskList.tasks.push(task);
    }
  }

  get(): TaskList {
    return this.taskList;
  }

  update(updatedTasks: Task[]): void {
    for (const updatedTask of updatedTasks) {
      const index = this.taskList.tasks.findIndex(
        (task) => task.id === updatedTask.id,
      );
      if (index !== 1) this.taskList.tasks[index] = updatedTask;
    }
  }

  delete(id: number): void {
    this.taskList.tasks = this.taskList.tasks.filter((task) => task.id !== id);
  }
}
```
> model/Task.ts
```ts
import { TaskStateEnum } from './taskStateEnum';

export class Task {
  public id: number;
  public title: string;
  public description: string;
  public state: TaskStateEnum;
  public creationDate: Date = new Date();

  constructor(title: string, description: string, state: TaskStateEnum) {
    this.id = Math.random();
    this.title = title;
    this.description = description;
    this.state = state;
  }
}
```
> model/TaskList.ts
```ts
import { Task } from './Task';

export class TaskList {
  tasks: Task[];

  constructor(tasks: Task[]) {
    this.tasks = tasks;
  }
}
```

### Facade Pattern
> task-list.component.ts
```ts
import { Component, OnInit } from '@angular/core';
import { TaskList } from '../../../../model/TaskList';
import { TaskStateEnum } from '../../../../model/taskStateEnum';
import { TaskFacadeService } from '../../facade/task-facade.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  taskListCurrent: TaskList = new TaskList([]);
  taskListArchived: TaskList = new TaskList([]);
  taskFacade: TaskFacadeService = new TaskFacadeService();

  private includeTasksByStatus(status: TaskStateEnum, taskList: TaskList) {
    this.taskFacade.getByStatus(status).subscribe((tasks) => {
      for (const task of tasks.filter((task) => task.state === status)) {
        taskList.add(task);
      }
    });
  }

  ngOnInit(): void {
    this.includeTasksByStatus(TaskStateEnum.TODO, this.taskListCurrent);
    this.includeTasksByStatus(TaskStateEnum.IN_PROGRESS, this.taskListCurrent);
    this.includeTasksByStatus(TaskStateEnum.DONE, this.taskListArchived);
  }
}
```
> task-facade.service.ts
```ts
import { Injectable } from '@angular/core';
import { TaskFacadeInterface } from '../interface/task-facade-interface';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CrudTaskListService } from '../services/crud-task-list/crud-task-list.service';
import { ByStatusTaskListService } from '../services/by-status-task-list/by-status-task-list.service';
import { Task } from '../../../model/Task';
import { TaskStateEnum } from '../../../model/taskStateEnum';

@Injectable({
  providedIn: 'root',
})
export class TaskFacadeService implements TaskFacadeInterface {
  private taskCrudProvider: CrudTaskListService = new CrudTaskListService();
  private taskProvider: ByStatusTaskListService = new ByStatusTaskListService();
  private taskSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(
    this.taskCrudProvider.get().tasks,
  );
  public tasks$: Observable<Task[]> = this.taskSubject.asObservable();

  constructor() {}

  create(task: Task): Observable<void> {
    this.taskCrudProvider.create([task]);
    return of(void 0);
  }

  delete(task: Task): Observable<void> {
    this.taskCrudProvider.delete(task.id);
    return of(void 0);
  }

  getAll(): Observable<Task[]> {
    return this.tasks$;
  }

  getByStatus(status: TaskStateEnum): Observable<Task[]> {
    return of(this.taskProvider.get(status).tasks);
  }

  update(task: Task): Observable<void> {
    this.taskCrudProvider.update([task]);
    this.taskSubject.next(this.taskCrudProvider.get().tasks);
    return of(void 0);
  }
}
```
> task-facade-interface.ts
```ts
import { Task } from '../../../model/Task';
import { Observable } from 'rxjs';
import { TaskStateEnum } from '../../../model/taskStateEnum';

export interface TaskFacadeInterface {
  create(task: Task): Observable<void>;

  getAll(): Observable<Task[]>;

  getByStatus(status: TaskStateEnum): Observable<Task[]>;

  update(task: Task): Observable<void>;

  delete(task: Task): Observable<void>;
}
```
> model/TaskList.ts
```ts
import { Task } from './Task';
export class TaskList {
  tasks: Task[];
  constructor(tasks: Task[]) {
    this.tasks = tasks;
  }

  public add(task: Task) {
    this.tasks.push(task);
  }
}
```








