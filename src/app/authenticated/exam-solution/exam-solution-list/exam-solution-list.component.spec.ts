import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamSolutionListComponent } from './exam-solution-list.component';

describe('ExamSolutionListComponent', () => {
  let component: ExamSolutionListComponent;
  let fixture: ComponentFixture<ExamSolutionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamSolutionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamSolutionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
