import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  decile: number = 0;

  constructor(private serQuestion: QuestionService) { }

  ngOnInit(): void {
    this.getDecile();
  }

  getDecile(): void {
    console.log('start')
    this.serQuestion.getDecile('14').subscribe((data: any) => {
      console.log(data);
      this.decile = data;
    });
  }

  // getDecile(): void {
  //   console.log('start')
  //   this.decile = this.serQuestion.getDecile('14');
  // }
}
