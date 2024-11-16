import { TestBed } from '@angular/core/testing';

import { ClassManagerService } from './class-manager.service';

describe('ClassManagerService', () => {
  let service: ClassManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
