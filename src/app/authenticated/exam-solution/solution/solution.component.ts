import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ExamSolutionClientService } from '../exam-solution-client.service';

@Component({
  selector: 'solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss']
})
export class SolutionComponent implements OnInit, OnChanges {
  @Input() selectedExam: any = null;
  @Input() selectedAction: any = null;
  @Output() onExamSolved = new EventEmitter();
  showDates = false;
  showAnswer = false;
  initSelectedExam: any = null;
  questionNumber = 1;
  solutions: any[] = [];
  result: any = '';
  private unsubscribeAll = new Subject();
  constructor(
    private _spinner: NgxSpinnerService,
    private _examSolutionClient: ExamSolutionClientService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.selectedExam && this.selectedExam && !this.selectedExam.folder) {
      this.onEnterExam();
    }
    if (changes && changes.selectedAction) {
      if (this.selectedAction == "enter" && this.selectedExam && !this.selectedExam.folder) {
        this.onEnterExam();
      }
      if (this.selectedAction == "back" && this.selectedExam && !this.selectedExam.folder) {
        this.selectedExam.questions = this.initSelectedExam.questions;
      }
      if (this.selectedAction == "save") {
        this.showSpinner();
        this._examSolutionClient.solveExam({
          exam_id: this.selectedExam.id,
          solutions: this.getSolutions()
        }).pipe(takeUntil(this.unsubscribeAll))
          .subscribe((response: any) => {
            this.showAnswer = true;
            this._spinner.hide();
            this.result = response.result;
            this.solutions = response.solutions;
            if (!this.selectedExam.exercise) {
              this.selectedExam.exam_solutions = { solutions: this.solutions, result: this.result }
            }
            this.initSelectedExam = { questions: JSON.parse(JSON.stringify(this.selectedExam.questions)) };
            //Emit the event to reset selected action so that i can use save many times
            this.onExamSolved.emit();
          }, (error) => console.log(error))
      }
      if (this.selectedAction == "show-answer") {
        this.showAnswer = true;
        if (this.solutions.length > 0) return;
        this.showSpinner();
        this._examSolutionClient.solveExam({
          exam_id: this.selectedExam.id,
          solutions: this.getSolutions()
        }).pipe(takeUntil(this.unsubscribeAll))
          .subscribe((response) => {
            this.solutions = response.solutions;
            this._spinner.hide();
          }, (error) => console.log(error))
      }
      if (this.selectedAction == "hide-answer") {
        this.showAnswer = false;
      }
    }
  }
  //Methods
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
  correctAnswer(questionIndex: any, selectionIndex: any) {
    if (this.solutions.length > 0 && this.showAnswer) {
      let questionSolution: any = this.solutions.filter((solution: any) => {
        return solution.questionIndex == questionIndex;
      })[0];
      return questionSolution.correctSelectionIndex == selectionIndex;
    }
    return false;
  }
  examAvailable() {
    if (this.selectedExam.exam_solutions) return true;
    return (this.selectedExam.start_date ? new Date() >= new Date(this.selectedExam.start_date) : true)
      &&
      (this.selectedExam.end_date ? new Date() <= new Date(this.selectedExam.end_date) : true);
  }
  //Commons
  private showSpinner() {
    this._spinner.show(undefined, {
      type: "ball-spin-clockwise",
      size: 'medium',
      bdColor: 'none',
    });
  }
  private getSolutions() {
    let solutions: any[] = [];
    this.selectedExam.questions.forEach((question: any, questionIndex: any) => {
      question.selections.forEach((selection: any, selectionIndex: any) => {
        if (selection.selected) {
          solutions.push({ questionIndex: questionIndex, selectedSelectionIndex: selectionIndex });
        }
      })
    });
    return solutions;
  }
  private onEnterExam() {
    this.initSelectedExam = { questions: JSON.parse(JSON.stringify(this.selectedExam.questions)) };
    this.questionNumber = 1;
    this.showDates = false;
    if (!this.selectedExam.exercise && this.selectedExam.exam_solutions) {
      this.showAnswer = true;
      this.selectedExam.exam_solutions.solutions.forEach((solution: any) => {
        this.onRadioChoosed(solution.questionIndex, solution.selectedSelectionIndex);
      });
      this.solutions = this.selectedExam.exam_solutions.solutions;
      this.result = this.selectedExam.exam_solutions.result;
    }
    else {
      this.solutions = [];
      this.result = '';
    }
  }
}
