import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GameService} from "../../services/game.service";
import {AlertController, LoadingController} from "@ionic/angular";
import {GameStep} from "../../enum/GameStap";
import {CurrentQuestion} from "./shared/CurrentQuestion";
import {Result} from "./shared/Result";
import {AnimationTimerComponent} from "../../components/animation-timer";
import {GameTypeTimeService} from "../../services/game-type-time.service";

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
  questionsData: any;
  step: GameStep = GameStep.category;
  public _currentQuestion: CurrentQuestion | undefined
  percent = 100
  result: Result;
  protected readonly GameStep = GameStep;
  timeGame: number = 0;
  task: number = 0
  intervalTimer: any
  topList: any
  @ViewChild(AnimationTimerComponent, {static: true}) childComponent!: AnimationTimerComponent;


  constructor(private route: ActivatedRoute,
              private _gameService: GameService,
              private _gameTypeTimeService: GameTypeTimeService,
              private loadingController: LoadingController,
              private alertController: AlertController) {

    this.result = new Result({})
  }

  ngOnInit() {
  }


  ionViewWillEnter() {
    this.step =  GameStep.category;
    this.percent = 100;
    this.result = new Result({})

  }
  getCategory(id:number){
    console.log(id)
    this.result.category_id =id;
    this.step =  GameStep.typeTime;
  }
  getTypeTime(item:any){
    this.initGame(item)
  }

  async initGame(item: any) {
    this.result.time_type_id = item.id;
    this.task = item.count;
    this.timeGame = item.count;
    this.step = GameStep.init;
    this.getData(this.result.category_id)

    await this.presentLoading();
  }

  getData(category: number) {
    this._gameService.getGameData(category)
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
      this.result.points = this.getPoints()
      if (this.result.count > 0) {
        this._gameService.saveResult({result: this.result})
          .subscribe(res => {
            console.log(res.topList)
            this.topList = res.topList
          })
      }
    }
  }

  nextQuestion() {
    if (!this._currentQuestion) {
      this.setCurrentQuestion({i: 0, data: this.questionsData[0]})
    } else {
      if (this._currentQuestion.i === this.questionsData.length - 1) {
        this.getData(this.result.category_id);
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
    clearInterval(this.intervalTimer)
    this.step = GameStep.category
    this.task = 0;
    this.timeGame = 0;
    clearInterval(this.childComponent.animationIntervalTimer)
  }

  public getPoints() {
    if (this.result.count === 0 || this.result.correct === 0 || this.result.correct * 100 / this.result.count < 40) {
      return 0;
    } else {
      return this.result.count > 0 ? Math.round(this.result.correct / this.result.count * 100) * this.result.correct : 0

    }
  }

}
