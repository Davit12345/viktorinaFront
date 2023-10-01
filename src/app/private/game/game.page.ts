import {Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GameService} from "../../services/game.service";
import {AlertController, LoadingController} from "@ionic/angular";
import {GameStep} from "../../enum/GameStap";
import {CurrentQuestion} from "./shared/CurrentQuestion";
import {Result} from "./shared/Result";
import {AnimationTimerComponent} from "../../components/animation-timer";

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
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
  @ViewChild(AnimationTimerComponent, {static: true}) childComponent!: AnimationTimerComponent;

  child() {
    this.childComponent.startTimer()
  }

  constructor(private route: ActivatedRoute, private _gameService: GameService, private loadingController: LoadingController, private alertController: AlertController) {
    this.result = new Result({})
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.task = this.timeGame;
    this.percent = 100;
    this.result = new Result({})
    this.route.params.subscribe(params => {
      this.categoryData = JSON.parse(params['data']);
      this.getData(this.categoryData)
    });
    await this.presentLoading();
  }

  getData(categories: any) {
    this._gameService.getGameData()
      .subscribe(
        res => {
          if (!this.questionsData) {
            this.questionsData = res.questions
          } else {
            this.questionsData = [...this.questionsData, ...res.questions]
            this.nextQuestion()
          }

        }
      );
  }

  task: number = 0
  intervalTimer: any

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'The game is loading.Pleas wait!',
      duration: 1000,

    });
    loading.onDidDismiss().then(() => {
      this.step = GameStep.start
      this.nextQuestion()
      this.childComponent?.startTimer()
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
    clearInterval(this.childComponent.animationIntervalTimer)
  }

  public getPoints() {
    if (this.result.count === 0 || this.result.correct === 0) {
      return 0;
    } else {
      var p = this.result.incorrect > 0 ? this.result.incorrect : 1;
      return Math.round( this.result.correct/ this.result.count *100) * this.result.correct

    }
  }

}
