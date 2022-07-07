import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamSolutionComponent } from './exam-solution.component';

describe('ExamSolutionComponent', () => {
  let component: ExamSolutionComponent;
  let fixture: ComponentFixture<ExamSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamSolutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
