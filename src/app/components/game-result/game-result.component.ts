import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.scss'],
})
export class GameResultComponent  implements OnInit {
  @Input() result: any
  @Input() resultList: any
  constructor() { }

  ngOnInit() {}

}
