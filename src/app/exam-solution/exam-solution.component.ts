import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-exam-solution',
  templateUrl: './exam-solution.component.html',
  styleUrls: ['./exam-solution.component.scss']
})
export class ExamSolutionComponent implements OnInit {
  selectedUser: any = null;
  selectedExam: any = null;
  selectedAction: any = '';
  examListHidden = false;
  filesTrace: any[] = [];
  constructor(private _title: Title,
    private cd: ChangeDetectorRef) { }
  ngOnInit(): void {
    this._title.setTitle("حلول الامتحانات");
  }
  //Methods
  onActionSelected(action: any) {
    this.selectedAction = action;
    if (action == "enter" && this.selectedExam && !this.selectedExam.folder) {
      this.examListHidden = true;
    }
    setTimeout(() => {
      if (action == "back") {
        if (this.filesTrace.length == 1 && !this.examListHidden) {
          this.selectedUser = null;
        }
        else if (this.examListHidden) {
          this.examListHidden = false;
        }
      }
    },1);
  }
  onExamSelected(exam: any) {
    this.selectedExam = exam;
    this.selectedAction = '';
    this.cd.detectChanges();
  }
  onUserSelected(user: any) {
    this.selectedUser = user;
  }
}
