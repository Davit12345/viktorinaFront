import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GameService} from "../../services/game.service";
import {AlertController, LoadingController} from "@ionic/angular";
import {GameStep} from "../../enum/GameStap";
import {CurrentQuestion} from "./shared/CurrentQuestion";
import {trigger, transition, animate, style} from '@angular/animations';
import {Result} from "./shared/Result";

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('300ms', style({opacity: 1})),
      ]),
      transition(':leave', [
        animate('300ms', style({opacity: 0})),
      ]),
    ]),
  ],
})
export class GamePage implements OnInit {
  currentQuestion(): CurrentQuestion {
    return <CurrentQuestion>this._currentQuestion;
  }

  setCurrentQuestion(value: CurrentQuestion | undefined) {
    this._currentQuestion = value;
  }

  categoryData: any;
  questionsData: any;
  step: GameStep = GameStep.init;
  public _currentQuestion: CurrentQuestion | undefined
  percent = 100
  result: Result;
  protected readonly GameStep = GameStep;
  timeGame = 15;

  constructor(private route: ActivatedRoute, private _gameService: GameService, private loadingController: LoadingController, private alertController: AlertController) {
    this.result = new Result({})
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.task = this.timeGame;
    this.duration = this.timeGame * 100000;
    this.percent = 100;
    this.result=new Result({})
    this.route.params.subscribe(params => {
      this.categoryData = JSON.parse(params['data']);
      this.getData(this.categoryData)
    });
    await this.presentLoading();
  }

  getData(categories: any) {
    this._gameService.getGameData({categories})
      .subscribe(
        res => {
          if (!this.questionsData) {
            this.questionsData = res.data
          } else {
            this.questionsData = [...this.questionsData, ...res.data]
            this.nextQuestion()
          }

        }
      );
  }

  task: number = this.timeGame
  intervalTimer: any

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'The game is loading.Pleas wait!',
      duration: 500,

    });
   loading.onDidDismiss().then(() => {
      this.step = GameStep.start
      this.nextQuestion()
      this.startTimer()
      this.intervalTimer = setInterval(() => {
        this.refreshData();
      }, 1000);
    });
    await loading.present();
  }

  refreshData() {
    this.task = this.task - 1
    if (this.task === 0) {
      clearInterval(this.intervalTimer)
      this.step = GameStep.finish
    }
  }

  nextQuestion() {
    if (!this._currentQuestion) {
      this.setCurrentQuestion({i: 0, data: this.questionsData[0]})
    } else {

      if (this._currentQuestion.i === this.questionsData.length - 1) {
        this.getData(this.categoryData);
        return
      }
      var i = this._currentQuestion.i + 1;
      this.setCurrentQuestion({i: i, data: this.questionsData[i]})
    }
  }

  answerQuestion(answer: any) {
    this.percent = Math.floor(Math.random() * 101);
    if (answer.flag) {
      this.result.correct = this.result.correct + 1;
      this.result.count = this.result.count + 1;
    } else {
      this.result.incorrect = this.result.incorrect + 1;
      this.result.count = this.result.count + 1;
    }
    this.nextQuestion();
  }

  ionViewDidLeave() {
    this.questionsData = undefined;
    this.setCurrentQuestion(undefined);
    this.step = GameStep.init
  }

  duration: number = this.timeGame * 100000; // Duration of the timer in milliseconds
  interval: number = 100; // Update interval in milliseconds
  progress: number = 0;



  startTimer() {
    this.progress = 0; // Reset progress
    const increments = this.duration / this.interval;
    const incrementAmount = 100 / increments;

    const interval = setInterval(() => {
      this.progress += incrementAmount;

      if (this.progress >= 100) {
        clearInterval(interval);
      }
    }, this.interval);
  }

}
