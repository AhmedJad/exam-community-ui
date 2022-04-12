import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { domain } from '../shared/consts/global';

@Injectable({
  providedIn: 'root'
})
export class ExamSolutionClientService {

  constructor(private _httpClient: HttpClient) { }
  public getUsers() {
    return this._httpClient.get(`${domain}/exams-solutions/users`) as Observable<any[]>;
  }
  public getExams(userId: any) {
    return this._httpClient.get(`${domain}/exams-solutions/user-exams/${userId}`) as Observable<any[]>;
  }
  public getChildren(parentId: any) {
    return this._httpClient.get(`${domain}/exams-solutions/exam-children/${parentId}`) as Observable<any[]>;
  }
  public solveExam(examSolution: any) {
    return this._httpClient.post(`${domain}/exams-solutions`, examSolution) as Observable<any>;
  }
}
