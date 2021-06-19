import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  question: Question = new Question({ "id": 2, "question": " POUR LA BANQUE MONDIALE- LE SEUIL INTERNATIONAL DE PAUVRET\u00c9 EXTR\u00caME EST FIX\u00c9  \u00c0", "choices_count": 3, "choices_content": ": A 1-25 dollar par jour ### B 1-90 dollar par jour ### C 5 dollars par  jour", "answer": "B", "karma": -23 });
  questionStack: Question[] = [];
  isAnswerAllGood: boolean = true;
  nextId: number = 0;

  questionTextView: string = '';
  tipTextView: string = '';
  answerATextView: string = '';
  answerBTextView: string = '';
  answerCTextView: string = '';
  answerDTextView: string = '';
  answerETextView: string = '';
  answerFTextView: string = '';

  getdecile: number = 0;
  post: string = "";
  getfirst: string = "";
  getquestion: string = "";

  constructor(private serQuestion: QuestionService) { }


  ngOnInit(): void {
    this.getDecile();
    this.getFirst();
    this.getQuestion();
  }
  
  getFirst(): void {
    console.log('first')
    this.serQuestion.subGetFirstQuestionJSON().subscribe((data: any) => {
      console.log(data);
      this.getfirst = data;
    });
  }

  getQuestion(): void {
    console.log('get')
    this.serQuestion.subGetQuestionJSON('14').subscribe((data: any) => {
      console.log(data);
      this.getquestion =  JSON.stringify(data);
    });
  }


  // post(): void {
  //   console.log('post')
  //   this.serQuestion.getQuestionJSON(this.getfirst).subscribe((data: any) => {
  //     console.log(data);
  //     this.post = data;
  //   });
  // }

  getDecile(): void {
    console.log('decile')
    this.serQuestion.getDecile('14').subscribe((data: any) => {
      console.log(data);
      this.getdecile = data;
    });
  }

  declareReplaybtn(): void {
    //5678
  }

  declareLinkbtn(): void {
    //5678
  }
  declareAbtn(): void {
    //5678
  }
  declareBbtn(): void {
    //5678
  }
  declareCbtn(): void {
    //5678
  }
  declareDbtn(): void {
    //5678
  }
  declareEbtn(): void {
    //5678
  }
  declareFbtn(): void {
    //5678
  }

}
