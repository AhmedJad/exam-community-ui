import { Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ExamSolutionClientService } from '../exam-solution-client.service';

@Component({
  selector: 'exam-solution-list',
  templateUrl: './exam-solution-list.component.html',
  styleUrls: ['./exam-solution-list.component.scss']
})
export class ExamSolutionListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() selectedUser: any = null;
  @Input() selectedAction: any = null;
  @Input() examListHidden: any = false;
  @Output() onExamSelected = new EventEmitter();
  @Output("filesTrace") _filesTrace = new EventEmitter();
  selectedExam: any = null;
  folders: any[] = [];
  files: any[] = [];
  filesTrace: any[] = [null];
  private unsubscribeAll = new Subject();
  constructor(private _examSolutionClient: ExamSolutionClientService,
    private _spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    this._filesTrace.emit(this.filesTrace);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.selectedUser && this.selectedUser) {
      this.showSpinner();
      this._examSolutionClient.getExams(this.selectedUser.id).pipe(takeUntil(this.unsubscribeAll))
        .subscribe((exams: any[]) => {
          this.mapToFoldersFiles(exams);
          this._spinner.hide();
        })
    }
    if (changes && changes.selectedAction && this.selectedAction) {
      if (this.selectedAction == "back" && !this.examListHidden && this.filesTrace.length > 1) {
        this.showSpinner();
        let prevFileId = this.filesTrace[this.filesTrace.length - 2]?.id;
        if (prevFileId) {
          this._examSolutionClient.getChildren(prevFileId).pipe(takeUntil(this.unsubscribeAll))
            .subscribe((exams: any[]) => {
              this.mapToFoldersFiles(exams);
              this.onExamSelected.emit(this.selectedExam = null);
              this.filesTrace.pop();
              this._spinner.hide();
            })
        }
        else {
          this._examSolutionClient.getExams(this.selectedUser.id).pipe(takeUntil(this.unsubscribeAll))
            .subscribe((exams: any[]) => {
              this.mapToFoldersFiles(exams);
              this.onExamSelected.emit(this.selectedExam = null);
              this.filesTrace.pop();
              this._spinner.hide();
            },(error)=>console.log(error))
        }
      }
      if (this.selectedAction == "enter" && this.selectedExam && this.selectedExam.folder) {
        this.showSpinner();
        this._examSolutionClient.getChildren(this.selectedExam.id).pipe(takeUntil(this.unsubscribeAll))
          .subscribe((exams: any[]) => {
            this.filesTrace.push(this.selectedExam);
            this.mapToFoldersFiles(exams);
            this._spinner.hide();
            this.onExamSelected.emit(this.selectedExam = null);
          },(error)=>console.log(error))
      }
    }
  }
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  //Methods
  onSelectExam(event: any, exam: any) {
    event.stopPropagation();
    this.onExamSelected.emit(this.selectedExam = exam);
  }
  @HostListener('document:click', ['$event'])
  unselectExam(event: any) {
    if (!this.examListHidden) this.onExamSelected.emit(this.selectedExam = null);
  }
  //Commons
  private mapToFoldersFiles(exams: any) {
    this.folders = exams.filter(function (exam: any) {
      return exam.folder;
    })
    this.files = exams.filter(function (exam: any) {
      return !exam.folder;
    })
  }
  private showSpinner() {
    this._spinner.show(undefined, {
      type: "ball-spin-clockwise",
      size: 'medium',
      bdColor: 'none'
    });
  }
}
