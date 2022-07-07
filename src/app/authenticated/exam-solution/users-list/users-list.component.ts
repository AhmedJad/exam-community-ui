import { Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ExamSolutionClientService } from '../exam-solution-client.service';
@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  @Output() onUserSelected = new EventEmitter();
  selectedUser: any = null;
  users: any[] = [];
  defaultImage="assets/images/default.jpg";
  private unsubscribeAll = new Subject();
  constructor(private _examSolutionClient: ExamSolutionClientService,
    private _spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this._spinner.show(undefined, {
      type: "ball-spin-clockwise",
      size: 'medium',
      bdColor: 'none'
    });
    this._examSolutionClient.getUsers().pipe(takeUntil(this.unsubscribeAll))
      .subscribe((users: any[]) => {
        this.users = users;
        this._spinner.hide();
      })
  }
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
