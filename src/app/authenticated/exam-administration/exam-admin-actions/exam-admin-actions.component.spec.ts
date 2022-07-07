import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamAdminActionsComponent } from './exam-admin-actions.component';

describe('ExamAdminActionsComponent', () => {
  let component: ExamAdminActionsComponent;
  let fixture: ComponentFixture<ExamAdminActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamAdminActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamAdminActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
