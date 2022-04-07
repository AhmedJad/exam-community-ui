import { ChangeDetectionStrategy } from '@angular/compiler/src/compiler_facade_interface';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ExamAdminClientService } from './exam-admin-client.service';

@Component({
  selector: 'app-exam-administration',
  templateUrl: './exam-administration.component.html',
  styleUrls: ['./exam-administration.component.scss']
})
export class ExamAdministrationComponent implements OnInit, OnDestroy {
  selectedExam: any = null;
  actions: any = [];
  exams: any[] = [];
  filesTrace: any[] = [null];
  newExam: any = null;
  deleteActionClicked = false;
  examCreationHidden = true;
  selectedAction: any = null;
  private unsubscribeAll = new Subject();
  constructor(private _spinner: NgxSpinnerService,
    private cd: ChangeDetectorRef,
    private _examAdminClient: ExamAdminClientService,
    private _title: Title) { }
  ngOnInit(): void {
    this._spinner.show(undefined, {
      type: "ball-spin-clockwise",
      size: 'medium',
      bdColor: 'none'
    });
    this._examAdminClient.getExams().pipe(takeUntil(this.unsubscribeAll))
      .subscribe(exams => {
        this._spinner.hide();
        this.exams = exams;
      });
    this._title.setTitle("ادارة الامتحانات")
  }
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  //Methods
  onSelectExam(exam: any) {
    this.selectedExam = exam;
    this.cd.detectChanges();
  }
  onSelectAction(action: any) {
    this.selectedAction = action;
    if (action == "delete") {
      this.deleteActionClicked = true;
    }
    if (action == "add-folder") {
      let lastFolder = this.filesTrace[this.filesTrace.length - 1];
      this.newExam = {
        folder: true, title: "بلاعنوان"
        , exam_id: lastFolder ? lastFolder.id : null
      };
    }
    if ((action == 'add-exam')) {
      let lastFolder = this.filesTrace[this.filesTrace.length - 1];
      this.newExam = {
        folder: false,
        title: "بلاعنوان",
        exam_id: lastFolder ? lastFolder.id : null,
        questions: []
      };
    }
    if (action == "enter") {
      if (this.selectedExam && !this.selectedExam.folder) {
        this.examCreationHidden = false;
      }
      else {
        this._spinner.show(undefined, {
          type: "ball-spin-clockwise",
          size: 'medium',
          bdColor: 'none'
        });
        this._examAdminClient.getChildren(this.selectedExam.id).pipe(takeUntil(this.unsubscribeAll))
          .subscribe(exams => {
            this._spinner.hide();
            this.exams = exams;
            this.filesTrace.push(this.selectedExam);
            this.actions[5].visible = true;
            this.selectedExam = null;
          });
      }
    }
    if (action == "back") {
      if (!this.examCreationHidden) {
        this.examCreationHidden = true;
        if (this.filesTrace.length > 1) {
          this.actions[5].visible = true;
        }
      }
      else {
        this.selectedExam = null;
        let prevFileId = this.filesTrace[this.filesTrace.length - 2]?.id;
        this._spinner.show(undefined, {
          type: "ball-spin-clockwise",
          size: 'medium',
          bdColor: 'none'
        });
        if (prevFileId) {
          this._examAdminClient.getChildren(prevFileId).pipe(takeUntil(this.unsubscribeAll))
            .subscribe(exams => {
              this._spinner.hide();
              this.exams = exams;
              this.filesTrace.pop();
              this.actions[5].visible = prevFileId ? true : false;
              this.selectedExam = null;
            });
        }
        else {
          //If back to root
          this._examAdminClient.getExams().pipe(takeUntil(this.unsubscribeAll))
            .subscribe(exams => {
              this._spinner.hide();
              this.exams = exams;
              this.filesTrace.pop();
              this.actions[5].visible = false;
            })
        }
      }
    }
  }
}
