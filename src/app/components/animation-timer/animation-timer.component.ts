import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {GameStep} from "../../enum/GameStap";

@Component({
  selector: 'animation-timer',
  templateUrl: './animation-timer.component.html',
  styleUrls: ['./animation-timer.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
export class AnimationTimerComponent  implements OnInit {

  @Input() time!: number;
  @Input() step!: GameStep;
  constructor() {
  }


  // animationDuration: number = this.time * 100000; // Duration of the timer in milliseconds
  interval: number = 100; // Update interval in milliseconds
  progress: number = 0;

  animationIntervalTimer:any=undefined;
  public startTimer() {
    console.log(1)
    this.progress = 0; // Reset progress
    const increments =  this.time * 100000/ this.interval;
    const incrementAmount = 100 / increments;

    this.animationIntervalTimer = setInterval(() => {
      this.progress += incrementAmount;

      if (this.progress >= 1) {
        clearInterval(this.animationIntervalTimer);
      }
    }, this.interval);
  }


  ngOnInit() {}

  protected readonly GameStep = GameStep;
}
