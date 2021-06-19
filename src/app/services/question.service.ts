
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private FIRST_URL_GET = "/api/v1/first/";
  private URL_GET = "/api/v1/question/";
  private URL_POST = "/api/v1/send/";
  private DECILE_URL_GET = "/api/v1/decile/";

  constructor(private http: HttpClient) { }

  getQuestionJSON(json: string) {
      this.http.post<any>(this.URL_POST, json).subscribe({
        next: data => {
          return data;
        },
        error: error => {
          console.error('There was an error with URL_POST!', error);
        }
      })
  }

  subGetFirstQuestionJSON() {
    return this.http.get(this.FIRST_URL_GET);
  }

  subGetQuestionJSON(nextId: string) {
    return this.http.get(this.URL_GET + nextId);
  }

  getDecile(lastId: string) {
    return this.http.get(this.DECILE_URL_GET + lastId);
  }

}
