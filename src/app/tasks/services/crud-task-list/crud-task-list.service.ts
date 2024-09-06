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
