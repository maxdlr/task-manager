import { TestBed } from '@angular/core/testing';

import { ByStatusTaskListService } from './by-status-task-list.service';

describe('ByStatusTaskListService', () => {
  let service: ByStatusTaskListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ByStatusTaskListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
