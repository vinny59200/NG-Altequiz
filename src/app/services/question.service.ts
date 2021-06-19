
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  private DECILE_URL_GET = "http://129.213.40.35:5000/decile/";
  constructor(private http: HttpClient) { }

  getDecile(lastId:string) {
     return this.http.get(this.DECILE_URL_GET+lastId);
  }



  // getDecile(lastId: string): any {
  //   return fetch(this.DECILE_URL_GET + lastId, {
  //     mode: 'cors',
  //     credentials: 'include'
  //   })
  // }
}
