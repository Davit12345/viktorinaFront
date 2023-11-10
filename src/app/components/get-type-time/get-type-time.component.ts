import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GameTypeTimeService} from "../../services/game-type-time.service";

@Component({
  selector: 'get-type-time',
  templateUrl: './get-type-time.component.html',
  styleUrls: ['./get-type-time.component.scss'],
})
export class GetTypeTimeComponent  implements OnInit {

  @Output() typeTime: EventEmitter<any> = new EventEmitter();

  gameTypeTime: any = []
  constructor(private _gameTypeTimeService: GameTypeTimeService,) {
    this._gameTypeTimeService.getGameTypeTime()
      .subscribe(
        res => {
          this.gameTypeTime = res
        }
      );
  }
  getTime(item:any){
    this.typeTime.emit(item)
  }
  ngOnInit() {}

}
