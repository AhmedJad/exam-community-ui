import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamAdministrationComponent } from './exam-administration.component';

describe('ExamAdministrationComponent', () => {
  let component: ExamAdministrationComponent;
  let fixture: ComponentFixture<ExamAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamAdministrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
