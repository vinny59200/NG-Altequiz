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
  answerA: string = '';
  isAnswerABtnDisabled: boolean = true;
  answerBTextView: string = '';
  answerB: string = '';
  isAnswerBBtnDisabled: boolean = true;
  answerCTextView: string = '';
  answerC: string = '';
  isAnswerCBtnDisabled: boolean = true;
  answerDTextView: string = '';
  answerD: string = '';
  isAnswerDBtnDisabled: boolean = true;
  answerETextView: string = '';
  answerE: string = '';
  isAnswerEBtnDisabled: boolean = true;
  answerFTextView: string = '';
  answerF: string = '';
  isAnswerFBtnDisabled: boolean = true;

  isBlogBtnDisabled: boolean = true;
  isReplayBtnDisabled: boolean = true;
  isTipTextViewDisabled: boolean = false;

  getdecile: number = 0;
  post: string = "";
  getfirst: string = "";
  getquestion: string = "";

  constructor(private serQuestion: QuestionService) { }


  ngOnInit(): void {
    // this.getDecile();
    // this.getFirst();
    //this.getQuestion();
    //this.doPost();
    this.launchTaskWithAnswer("BLANK_NOT_PROCESSED");
  }

  launchTaskWithAnswer(answer: string) {
    var userAnswer: string = answer;
    this.disbaleButtons();
    var json: any;
    var isFirst: boolean = (answer === "BLANK_NOT_PROCESSED");
    if (isFirst) {
      this.getFirst(json);
    } else {
      this.getQuestion(userAnswer, isFirst, json);
    }
    // this.question = new Question(json);
    // console.log("898 q:"+JSON.stringify(this.question))
    // if (userAnswer !== "BLANK_NOT_PROCESSED")this.nextId=this.question.id;
    // console.log("678 nextid:"+this.nextId);
  }

  private afterGetQuestion(isFirst: boolean, json: any) {
    console.log("345" + isFirst)
    // if (!isFirst) {
    this.serQuestion.getQuestionJSON(json).subscribe({
      next: data => {
        console.log("414:" + JSON.stringify(data));
        json = data;
        this.isAnswerABtnDisabled = false;
        this.isAnswerBBtnDisabled = false;
        if ((!this.isAnswerAllGood && this.questionStack.length > 9) || this.questionStack.length > 24) {
          console.log("665 over")
          this.handleDisplayWhenOver();
          this.launchDecileTask(this.question.id.toString());
        } else {
          console.log("785 not over")
          this.question = new Question(json);
          this.nextId = this.question.id;
          var answers: string[] = this.question.choices_content.split("###");
          this.answerATextView = answers[0];
          this.answerBTextView = answers[1];
          if (this.question.choices_count > 2)
            this.answerCTextView = answers[2];
          if (this.question.choices_count > 3)
            this.answerDTextView = answers[3];
          if (this.question.choices_count > 4)
            this.answerETextView = answers[4];
          if (this.question.choices_count > 5)
            this.answerFTextView = answers[5];
          this.handleDisplayWhenNotOver();
        }
        console.log("VV 700 quest Id:" + this.nextId + ", count quest:" + this.questionStack.length +
          ", perfect:" + this.isAnswerAllGood + " karma:" + this.question.karma);
        console.log(json);
      },
      error: error => {
        console.error('There was an error with URL_POST!', error);
      }
    })
    // }

  }

  launchDecileTask(lastId: string) {
    var id: string = lastId;
    this.serQuestion.getDecile(id).subscribe((data: any) => {
      console.log(data);
      var decile = this.calculateScore(data);
      console.log("090:" + decile)
      this.question.question = `Vous êtes meilleur(e) que ${decile}% des joueurs.`;
    });

  }

  calculateScore(decile: string) {
    return 100 - parseInt(decile) * 10;
  }

  getFirst(json: any): void {
    console.log('first')
    this.serQuestion.subGetFirstQuestionJSON().subscribe((data: any) => {
      console.log("465" + data)
      this.nextId = parseInt(data);
      this.getQuestion("BLANK_NOT_PROCESSED", true, json);
    });
  }

  getQuestion(userAnswer: string, isFirst: boolean, json: any): void {
    console.log('909:' + this.nextId)
    this.serQuestion.subGetQuestionJSON(this.nextId.toString()).subscribe((data: any) => {
      console.log("776:" + JSON.stringify(data));
      var q: Question = new Question(data);
      this.isAnswerAllGood = this.isAnswerAllGoodCalculation(q.answer, userAnswer, this.isAnswerAllGood);
      q.answer = userAnswer;
      if (userAnswer !== "BLANK_NOT_PROCESSED") { this.questionStack.push(q); }
      json = q;
      this.afterGetQuestion(isFirst, json);
    });
  }

  isAnswerAllGoodCalculation(fromDB: string, fromUser: string, isAnswerAllGood: boolean): boolean {
    if (fromUser === "BLANK_NOT_PROCESSED") {
      return true;
    } else {
      return isAnswerAllGood && fromDB.trim() === fromUser.trim();
    }
  }


  // doPost(): void {
  //   console.log('post')
  //   this.serQuestion.getQuestionJSON(this.test).subscribe({
  //     next: data => {
  //       console.log("343" + JSON.stringify(data));
  //       this.post = JSON.stringify(data);
  //     },
  //     error: error => {
  //       console.error('There was an error with URL_POST!', error);
  //     }
  //   })

  // }

  // getDecile(): void {
  //   console.log('decile')
  //   this.serQuestion.getDecile('14').subscribe((data: any) => {
  //     console.log(data);
  //     this.getdecile = data;
  //   });
  // }


  pushAbtn(): void {
    this.launchTaskWithAnswer("A");
  }
  pushBbtn(): void {
    this.launchTaskWithAnswer("B");
  }
  pushCbtn(): void {
    this.launchTaskWithAnswer("C");
  }
  pushDbtn(): void {
    this.launchTaskWithAnswer("D");
  }
  pushEbtn(): void {
    this.launchTaskWithAnswer("E");
  }
  pushFbtn(): void {
    this.launchTaskWithAnswer("F");
  }
  pushBlogbtn(): void {
    //5678
  }
  pushReplaybtn(): void {
    //5678
  }

  disbaleButtons() {
    this.isAnswerABtnDisabled = true;
    this.isAnswerBBtnDisabled = true;
    this.isAnswerCBtnDisabled = true;
    this.isAnswerDBtnDisabled = true;
    this.isAnswerEBtnDisabled = true;
    this.isAnswerFBtnDisabled = true;
  }

  handleDisplayWhenOver() {
    this.disbaleButtons();
    this.isReplayBtnDisabled = false;
    this.isBlogBtnDisabled = false;
    this.isTipTextViewDisabled = true;
    this.questionTextView = 'Votre résultat est en cours de calcul';
  }

  handleDisplayWhenNotOver() {
    this.questionTextView = this.question.question;
    this.tipTextView = this.question.answer;
    this.displayCDEFButtons();
    if (this.question.choices_count === 2) {
      this.isAnswerCBtnDisabled = true;
      this.isAnswerDBtnDisabled = true;
      this.isAnswerEBtnDisabled = true;
      this.isAnswerFBtnDisabled = true;
    } else if (this.question.choices_count === 3) {
      this.isAnswerDBtnDisabled = true;
      this.isAnswerEBtnDisabled = true;
      this.isAnswerFBtnDisabled = true;
    } else if (this.question.choices_count === 4) {
      this.isAnswerEBtnDisabled = true;
      this.isAnswerFBtnDisabled = true;
    } else if (this.question.choices_count === 5) {
      this.isAnswerEBtnDisabled = true;
      this.isAnswerFBtnDisabled = true;
    } else if (this.question.choices_count === 6) {
      this.isAnswerFBtnDisabled = true;
    }
    this.isReplayBtnDisabled = true;
    this.isBlogBtnDisabled = true;
    this.isTipTextViewDisabled = false;
  }

  displayCDEFButtons() {
    this.isAnswerABtnDisabled = false;
    this.isAnswerBBtnDisabled = false;
    this.isAnswerCBtnDisabled = false;
    this.isAnswerDBtnDisabled = false;
    this.isAnswerEBtnDisabled = false;
    this.isAnswerFBtnDisabled = false;
  }

}
