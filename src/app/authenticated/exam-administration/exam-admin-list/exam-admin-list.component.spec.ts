import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamAdminListComponent } from './exam-admin-list.component';

describe('ExamAdminListComponent', () => {
  let component: ExamAdminListComponent;
  let fixture: ComponentFixture<ExamAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamAdminListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
