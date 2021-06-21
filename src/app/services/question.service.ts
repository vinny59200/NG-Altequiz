
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { Observable } from 'rxjs';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private FIRST_URL_GET = "/api/v1/question/first/";
  private URL_GET = "/api/v1/question/";
  private URL_POST = "/api/v1/question/next/";

  constructor(private http: HttpClient) { }

  getQuestionJSON(json: any) {
    return this.http.post<any>(this.URL_POST, json);
  }

  subGetFirstQuestionJSON() {
    return this.http.get(this.FIRST_URL_GET);
  }

  subGetQuestionJSON(id: string) {
    return this.http.get(this.URL_GET + id);
  }

}
