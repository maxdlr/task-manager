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
