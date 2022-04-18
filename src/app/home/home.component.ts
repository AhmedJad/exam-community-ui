import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ExamAdminClientService } from '../exam-administration/exam-admin-client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _title:Title
  ) { }

  ngOnInit(): void {
  }

}
