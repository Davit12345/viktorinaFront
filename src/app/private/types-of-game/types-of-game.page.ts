import { Component, OnInit } from '@angular/core';
import {GameTypes} from "../../enum/GameTypes";
import { SocketService } from 'src/app/services/socket.service';

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
      image:'assets/images/game-types/simple.png'
    },
    {
      title: '1 vs  offline player(s) ',
      type:GameTypes.offline,
      image:'assets/images/game-types/offline.png'

    },
    {
      title: '1 vs 1 online',
      type:GameTypes.online,
      image:'assets/images/game-types/online.png'

    },
    {
      title: 'Tournaments',
      type:GameTypes.tournament,
      image:'assets/images/game-types/tournament.png'

    },
  ];

  chooseType(item:any){
        console.log(item)
  }


  message: string = '';

  constructor(private socketService: SocketService) {}

  sendMessage() {
    this.socketService.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() {

      this.socketService.getMessage().subscribe(data => {
        console.log('Received:', data);
        // Update UI with the received message
      });

  }


}
