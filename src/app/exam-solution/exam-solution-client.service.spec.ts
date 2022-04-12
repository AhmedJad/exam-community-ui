import { TestBed } from '@angular/core/testing';

import { ExamSolutionClientService } from './exam-solution-client.service';

describe('ExamSolutionClientService', () => {
  let service: ExamSolutionClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamSolutionClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
