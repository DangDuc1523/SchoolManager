import { TestBed } from '@angular/core/testing';

import { ListTeacherService } from './list-teacher.service';

describe('ListTeacherService', () => {
  let service: ListTeacherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListTeacherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
