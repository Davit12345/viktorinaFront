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
    console.log(message)
    this.socket.emit('message', message);
    this.socket.emit('newMessage', message);


  }

  getMessage(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('onMessage', (data: string) => {
        console.log(data)
        observer.next(data);
      });
    });
  }
}
