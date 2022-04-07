import { Component, OnInit } from '@angular/core';
import { ExamAdminClientService } from '../exam-administration/exam-admin-client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _examAdminClient: ExamAdminClientService) { }

  ngOnInit(): void {
    this._examAdminClient.editExam({
      start_date: "2022-04-07T13:00",
      questions: [{ 'context': 'x', selections: [{ context: '' }, { context: ''}] }]
    }).subscribe(() => { }, (error) => console.log(error))
  }

}
