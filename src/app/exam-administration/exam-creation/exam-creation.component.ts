import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ExamAdminClientService } from '../exam-admin-client.service';

@Component({
  selector: 'exam-creation',
  templateUrl: './exam-creation.component.html',
  styleUrls: ['./exam-creation.component.scss']
})
export class ExamCreationComponent implements OnInit, OnChanges, OnDestroy {
  @Input() selectedExam: any = null;
  @Input() selectedAction: any = null;
  @Output() onExamSaved = new EventEmitter();
  initSelectedExam: any = null;
  questionNumber = 1;
  startDateBeforeCurrent = false;
  endDateBeforeCurrent = false;
  endDateBeforeStart = false;
  private unsubscribeAll = new Subject();
  constructor(private _examAdminClient: ExamAdminClientService,
    private _spinner: NgxSpinnerService) { }
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.selectedExam && this.selectedExam && !this.selectedExam.folder) {
      this.initSelectedExam = JSON.parse(JSON.stringify(this.selectedExam));
      this.initSelectedExam.questions = JSON.parse(JSON.stringify(this.selectedExam.questions));
      this.questionNumber = 1;
    }
    if (changes && changes.selectedAction) {
      if (this.selectedAction == "save") {
        this._spinner.show(undefined, {
          type: "ball-spin-clockwise",
          size: 'medium',
          bdColor: 'none',
        });
        this._examAdminClient.editExam({
          ...this.selectedExam,
          index: undefined
        }).pipe(takeUntil(this.unsubscribeAll))
          .subscribe(() => {
            this._spinner.hide();
            this.initSelectedExam = JSON.parse(JSON.stringify(this.selectedExam));
            this.initSelectedExam.questions = JSON.parse(JSON.stringify(this.selectedExam.questions));
            //Emit the event to reset selected action so that i can use save many times
            this.onExamSaved.emit();
          }, (error) => console.log(error))
      }
      if (this.selectedAction == "back" && this.selectedExam && !this.selectedExam.folder) {
        this.selectedExam.title = this.initSelectedExam.title;
        this.selectedExam.start_date = this.initSelectedExam.start_date;
        this.selectedExam.end_date = this.initSelectedExam.end_date;
        this.selectedExam.exercise = this.initSelectedExam.exercise;
        this.selectedExam.answer_shown = this.initSelectedExam.answer_shown;
        this.selectedExam.selections_size = this.initSelectedExam.selections_size;
        this.selectedExam.questions = this.initSelectedExam.questions;
      }
      if (this.selectedAction == "enter" && this.selectedExam && !this.selectedExam.folder) {
        this.initSelectedExam = JSON.parse(JSON.stringify(this.selectedExam));
        this.initSelectedExam.questions = JSON.parse(JSON.stringify(this.selectedExam.questions));
        this.questionNumber = 1;
      }
    }
  }
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  addQuestion() {
    let newQuestion: any = { context: 'بلا عنوان', selections: [] };
    //Dynamically generate number of selections for each request based on selection_size
    for (let i = 0; i < this.selectedExam.selections_size; i++) {
      let selection: any = { context: 'بلا عنوان', selected: (i == 0) ? true : false };
      newQuestion.selections.push(selection);
    }
    this.selectedExam.questions.push(newQuestion);
    this.questionNumber = this.selectedExam.questions.length;
  }
  removeCurrentQuestion() {
    let index = this.questionNumber - 1;
    if (this.selectedExam.questions.length == this.questionNumber) {
      this.questionNumber--;
      index = this.questionNumber;
    }
    this.selectedExam.questions.splice(index, 1);
  }
  next() {
    this.questionNumber++;
  }
  prev() {
    this.questionNumber--;
  }
  onRadioChoosed(questionIndex: any, selectionIndex: any) {
    let selections = this.selectedExam.questions[questionIndex].selections;
    selections.forEach((selection: any, index: any) => {
      selection.selected = index == selectionIndex ? true : false;
    });
  }
  changeSelectionsSize() {
    //Validation
    this.selectedExam.selections_size = this.selectedExam.selections_size < 2 ? 2
      : this.selectedExam.selections_size;
    this.selectedExam.selections_size = this.selectedExam.selections_size > 6 ? 6
      : this.selectedExam.selections_size;
    //If exam selections size equal questions selections size , don't do anything
    if (this.selectedExam.selections_size == this.selectedExam.questions[0].selections.length) return;

    let selectedSelectionRemoved = false;
    this.selectedExam.questions.forEach((question: any) => {
      let selectionsSize = question.selections.length;
      //If exam selections size < question's selections size remove the increase
      if (this.selectedExam.selections_size < selectionsSize) {
        for (let i = 0; i < selectionsSize - this.selectedExam.selections_size; i++) {
          if (question.selections.pop().selected) selectedSelectionRemoved = true;
        }
        //If selected selection removed then the first selection will be selected
        if (selectedSelectionRemoved) question.selections[0].selected = true
      }
      //If exam selections size > question's selections size add the increase
      else {
        for (let i = 0; i < this.selectedExam.selections_size - selectionsSize; i++) {
          question.selections.push({ context: 'بلاعنون', selected: false });
        }
      }
    });
  }
  onTitleBlur() {
    this.selectedExam.title = this.selectedExam.title ? this.selectedExam.title : 'بلا عنوان';
  }
  onDateBlur() {
    //Check if start date before current date
    this.startDateBeforeCurrent = this.selectedExam.start_date
      && new Date(this.selectedExam.start_date) < new Date();
    //Check if end date before current date
    this.endDateBeforeCurrent = this.selectedExam.end_date
      && new Date(this.selectedExam.end_date) < new Date();
    //Check if end date before start date
    this.endDateBeforeStart = this.selectedExam.start_date && this.selectedExam.end_date
      && new Date(this.selectedExam.end_date) <= new Date(this.selectedExam.start_date);
    if (this.selectedExam.start_date || this.selectedExam.end_date) {
      this.selectedExam.exercise = false;
      this.selectedExam.answer_shown = false;
    }
  }
  onExerciseChange(event: any) {
    if (this.selectedExam.exercise) {
      this.selectedExam.start_date = '';
      this.selectedExam.end_date = '';
    }
  }
  onQuestionBlur(index: any) {
    this.selectedExam.questions[index].context = this.selectedExam.questions[index].context ?
      this.selectedExam.questions[index].context : 'بلا عنوان';
  }
  onSelectionBlur(questionIndex: any, selectionIndex: any) {
    this.selectedExam.questions[questionIndex].selections[selectionIndex].context =
      this.selectedExam.questions[questionIndex].selections[selectionIndex].context ?
        this.selectedExam.questions[questionIndex].selections[selectionIndex].context : 'بلا عنوان';
  }
}
