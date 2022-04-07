import { Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ExamAdminClientService } from '../exam-admin-client.service';

@Component({
  selector: 'exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.scss']
})
export class ExamListComponent implements OnInit, OnDestroy, OnChanges {
  @Output() onSelectExam = new EventEmitter();
  @Output() onExamDeleted = new EventEmitter();
  @Input() exams: any[] = [];
  @Input() newExam: any = null;
  @Input() deleteActionClicked = false;
  @Input() examCreationHidden = false;
  folders: any[] = [];
  files: any[] = [];
  selectedExam: any = null;
  initText = '';
  private unsubscribeAll = new Subject();
  constructor(private _examAdminClient: ExamAdminClientService,
    private _spinner: NgxSpinnerService) { }
  ngOnInit(): void {
  }
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.exams) {
      this.files = this.exams.filter((exam: any) => {
        return !exam.folder;
      })
      this.folders = this.exams.filter((exam: any) => {
        return exam.folder;
      })
    }
    if (changes && changes.deleteActionClicked && changes.deleteActionClicked.currentValue) {
      this._spinner.show(undefined, {
        type: "ball-spin-clockwise",
        size: 'medium',
        bdColor: 'none',
      });
      this._examAdminClient.delete(this.selectedExam.id).pipe(takeUntil(this.unsubscribeAll))
        .subscribe(() => {
          this.selectedExam.folder ? this.folders.splice(this.selectedExam.index, 1) :
            this.files.splice(this.selectedExam.index, 1);
          this.onSelectExam.emit(this.selectedExam = null);
          this._spinner.hide();
        })
      this.onExamDeleted.emit();
    }
    if (changes && changes.newExam && changes.newExam.currentValue) {
      let wrapper = "";
      let index = this.newExam.folder ? this.folders.length - 1 : this.files.length - 1;
      if (this.newExam.folder) {
        wrapper = "folders";
        this.folders.push(this.newExam);
      }
      else {
        wrapper = "files";
        this.files.push(this.newExam);
      }
      this.onExamSelected(this.newExam, index);
      document.getElementById(wrapper + this.newExam.id)?.focus();
    }
  }
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  //Methods
  onFocus(folder: any) {
    if (folder.id) this.initText = folder.title;
  }
  onExamSelected(exam: any, index: any, event: any = null) {
    if (event) event.stopPropagation();
    exam.index = index;
    this.onSelectExam.emit(exam);
    this.selectedExam = exam;
  }
  onBlur(exam: any) {
    exam.title = exam.title ? exam.title : 'بلا عنوان';
    if (this.initText != exam.title) {
      this._spinner.show(undefined, {
        type: "ball-spin-clockwise",
        size: 'medium',
        bdColor: 'none'
      });
      if (!exam.id) {
        this._examAdminClient.create(exam).pipe(takeUntil(this.unsubscribeAll))
          .subscribe((_exam: any) => {
            exam.questions = !_exam.folder ? _exam.questions : undefined;
            exam.selections_size=!_exam.folder ? _exam.selections_size : undefined;
            exam.id = _exam.id;
            this._spinner.hide();
            this.initText = '';
          }, error => console.log(error));
      }
      else {
        this._examAdminClient.rename(exam).pipe(takeUntil(this.unsubscribeAll))
          .subscribe(() => {
            this._spinner.hide();
            this.initText = '';
          }, error => console.log(error));
      }
    }
  }
  @HostListener('document:click', ['$event'])
  unselectExam(event: any) {
    if (this.examCreationHidden) this.onSelectExam.emit(this.selectedExam = null);
  }
}
