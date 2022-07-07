import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamSolutionActionsComponent } from './exam-solution-actions.component';

describe('ExamSolutionActionsComponent', () => {
  let component: ExamSolutionActionsComponent;
  let fixture: ComponentFixture<ExamSolutionActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamSolutionActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamSolutionActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
