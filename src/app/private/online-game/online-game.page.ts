import { Component, OnInit } from '@angular/core';
import {io} from "socket.io-client";
import {SocketService} from "../../services/socket.service";

@Component({
  selector: 'app-online-game',
  templateUrl: './online-game.page.html',
  styleUrls: ['./online-game.page.scss'],
})
export class OnlineGamePage   {

  // private socket: any;
  public roomName: string='';
  public roomList:any;
  //
  constructor(private socketService: SocketService,) {
    // this.socket = io('http://localhost:3000');

    this.socketService.init();

  }


  //
  createRoom() {
    console.log(this.roomName)
    this.socketService.createRoom(this.roomName)
  }

  joinRoom() {
    console.log(this.roomName)
    this.socketService.joinRoom(this.roomName)
  }
  leaveRoom() {
    this.socketService.leaveRoom(this.roomName)
  }
  ngOnInit() {

    this.socketService.getRoomList().subscribe(data => {
      console.log('rooms:', data);
      this.roomList=data;
      // Update UI with the received message
    });

  }
}
