import { TestBed } from '@angular/core/testing';

import { CrudTaskListService } from './crud-task-list.service';

describe('CrudTaskListService', () => {
  let service: CrudTaskListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudTaskListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
