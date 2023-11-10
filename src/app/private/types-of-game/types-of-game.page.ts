import { Component, OnInit } from '@angular/core';
import {GameTypes} from "../../enum/GameTypes";
import { SocketService } from 'src/app/services/socket.service';
import {Router} from "@angular/router";

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
      image:'assets/images/game-types/simple.png',
      url:'game'
    },
    {
      title: '1 vs 1 online',
      type:GameTypes.online,
      image:'assets/images/game-types/online.png',
      url:'online-game'

    },
    {
      title: 'Tournaments',
      type:GameTypes.tournament,
      image:'assets/images/game-types/tournament.png',
      url:'tournament'

    },
  ];

  chooseType(item:any){
       this.router.navigateByUrl(`tabs/${item.url}`)
  }


  message: string = '';

  constructor(private socketService: SocketService,public router:Router) {}

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
