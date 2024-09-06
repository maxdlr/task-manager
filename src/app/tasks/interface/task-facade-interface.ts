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
