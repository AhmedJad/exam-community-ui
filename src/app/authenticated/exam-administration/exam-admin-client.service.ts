import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { domain } from '../../shared/consts/global';

@Injectable({
  providedIn: 'root'
})
export class ExamAdminClientService {

  constructor(private _httpClient: HttpClient) {
  }
  public getExams() {
    return this._httpClient.get(`${domain}/exams`) as Observable<any[]>;
  }
  public getChildren(parentId: any) {
    return this._httpClient.get(`${domain}/exams/${parentId}`) as Observable<any[]>;
  }
  public create(exam: any) {
    return this._httpClient.post(`${domain}/exams/create`, exam) as Observable<any[]>;
  }
  public rename(exam: any) {
    return this._httpClient.put(`${domain}/exams/rename`, exam);
  }
  public editExam(exam:any){
    return this._httpClient.put(`${domain}/exams`, exam);
  }
  public delete(id: any) {
    return this._httpClient.delete(`${domain}/exams/delete/${id}`);
  }
}
