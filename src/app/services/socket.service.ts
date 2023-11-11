import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;

  constructor() {
    this.socket = io('http://localhost:3001', { transports: ['websocket'] }); // Replace with your server URL
  }

  sendMessage(message: string) {
    this.socket.emit('message', message);
  }
  createRoom(roomName:any) {
    this.socket.emit('createRoom', roomName);
  }

  joinRoom(roomName:any) {
    this.socket.emit('joinRoom',roomName);
  }
  leaveRoom(roomName:any) {
    this.socket.emit('leaveRoom',roomName);
  }


  getMessage(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('onMessage', (data: string) => {
        observer.next(data);
      });
    });
  }
  getRoomList(): Observable<string> {
    this.socket.emit('getRoomList', {});
    return new Observable<string>(observer => {
      this.socket.on('roomList', (data: string) => {
        observer.next(data);
      });
    });
  }

  init(){
    this.socket.on('roomCreated', (roomName:any) => {
      console.log(`Room created: ${roomName}`);
    });

    this.socket.on('userJoined', (userId:any) => {
      console.log(`User joined: ${userId}`);
    });

    this.socket.on('userLeft', (userId:any) => {
      console.log(`User left: ${userId}`);
    });

  }


}
