import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() currentId = "exam-administration";
  constructor(public _router: Router) { }

  ngOnInit(): void {
  }
  //Methods
  navigate(path: any) {
    this._router.navigate([path]);
  }
}
