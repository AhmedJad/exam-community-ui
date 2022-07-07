import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'exam-admin-actions',
  templateUrl: './exam-admin-actions.component.html',
  styleUrls: ['./exam-admin-actions.component.scss'],
})
export class ExamAdminActionsComponent implements OnInit {
  @Input() selectedItem: any = null;
  @Output() onSelectAction = new EventEmitter();
  @Output("actions") onActionCreated = new EventEmitter();
  actions = [
    { id: "add-folder", icon: "fa-solid fa-folder-plus", requireSelection: false, visible: true },
    { id: 'add-exam', icon: "fa-solid fa-file-circle-plus", requireSelection: false, visible: true },
    { id: 'delete', icon: "fa-regular fa-trash-can", requireSelection: true, visible: true },
    { id: 'save', icon: "fa-regular fa-save", visible: false },
    { id: 'enter', icon: "fas fa-arrow-right", requireSelection: true, visible: true },
    { id: 'back', icon: "fas fa-arrow-left", visible: false },
  ];
  constructor(private _router:Router) { }
  ngOnInit(): void {
    this.onActionCreated.emit(this.actions);
  }
  //Methods
  onActionSelected(event: any, id: any) {
    event.stopPropagation();
    if (id == "enter" && this.selectedItem && !this.selectedItem.folder) {
      this.makeAllActionsExcept(false, ['back', 'save']);
    }
    else if (id == "back" && this.selectedItem && !this.selectedItem.folder) {
      this.makeAllActionsExcept(true, ['back', 'save']);
    }
    this.onSelectAction.emit(id);
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
}
