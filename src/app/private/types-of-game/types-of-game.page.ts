import { Component, OnInit } from '@angular/core';
import {GameTypes} from "../../enum/GameTypes";

@Component({
  selector: 'app-types-of-game',
  templateUrl: './types-of-game.page.html',
  styleUrls: ['./types-of-game.page.scss'],
})
export class TypesOfGamePage implements OnInit {
  gameTypes: any[] = [
    {
      title: 'Simple',
      type:GameTypes.simple,
      image:'assets/images/game-typs/simple.png'
    },
    {
      title: '1 vs  offline player(s) ',
      type:GameTypes.offline,
      image:'assets/images/game-typs/offline.png'

    },
    {
      title: '1 vs 1 online',
      type:GameTypes.online,
      image:'assets/images/game-typs/online.png'

    },
    {
      title: 'Tournaments',
      type:GameTypes.tournament,
      image:'assets/images/game-typs/tournament.png'

    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
