import { TestBed } from '@angular/core/testing';

import { ExamAdminClientService } from './exam-admin-client.service';

describe('ExamAdminClientService', () => {
  let service: ExamAdminClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamAdminClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
