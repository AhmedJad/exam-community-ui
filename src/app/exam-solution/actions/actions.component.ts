import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  @Input() selectedExam: any = null;
  @Input() examListHidden: any = false;
  @Output() onSelectAction = new EventEmitter();
  actions = [
    { id: 'show-answer', icon: "fas fa-eye", requiredSelection: true, visible: false },
    { id: 'hide-answer', icon: "fas fa-eye-slash", requiredSelection: true, visible: false },
    { id: 'save', icon: "fa-regular fa-save", requiredSelection: true, visible: false },
    { id: 'enter', icon: "fas fa-arrow-right", requiredSelection: true, visible: true },
    { id: 'back', icon: "fas fa-arrow-left", requiredSelection: false, visible: true },
  ];
  constructor() { }

  ngOnInit(): void {
  }
  //Methods
  onActionSelected(event: any, id: any) {
    event.stopPropagation();
    if (id == "enter" && this.selectedExam && !this.selectedExam.folder) {
      let actions = ["back"];
      if (this.selectedExam.exercise && this.selectedExam.answer_shown) actions.push("show-answer");
      if ((!this.selectedExam.exercise && !this.selectedExam.exam_solutions && this.examAvailable())
        || this.selectedExam.exercise) actions.push("save");
      this.makeAllActionsExcept(false, actions);
    }
    else if (id == "show-answer") {
      this.actions[0].visible = false;
      this.actions[1].visible = true;
    }
    else if (id == "hide-answer") {
      this.actions[0].visible = true;
      this.actions[1].visible = false;
    }
    else if (id == "back" && this.examListHidden) {
      this.makeAllActionsExcept(true, ['show-answer', 'hide-answer', 'save']);
    }
    else if (id == "save") {
      this.actions[0].visible = false;
      this.actions[1].visible = false;
    }
    this.onSelectAction.emit(id);
  }
  actionVisible(action: any) {
    return action.visible && (action.requiredSelection ? this.selectedExam : true);
  }
  //Commons
  private makeAllActionsExcept(visible: any, actions: any) {
    this.actions.forEach(action => {
      if (!this.actionsIncludes(actions, action)) {
        action.visible = visible;
      }
      else {
        action.visible = !visible;
      }
    })
  }
  private actionsIncludes(actions: any[], action: any) {
    let counter = 0;
    actions.forEach(_action => {
      if (_action == action.id) {
        counter++;
      }
    });
    return counter > 0;
  }
  examAvailable() {
    return (this.selectedExam.start_date ? new Date() >= new Date(this.selectedExam.start_date) : true)
      &&
      (this.selectedExam.end_date ? new Date() <= new Date(this.selectedExam.end_date) : true);
  }
}
