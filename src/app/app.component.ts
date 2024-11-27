import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { io } from "socket.io-client";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular-socket-io';
  hostSocket = "http://localhost:3099";
  authToken = "AUTH_TOKEN"
  ngOnInit(): void {

    const socket = io(this.hostSocket, {
      withCredentials: true,
      extraHeaders: {
        'Authorization':`Bearer ${this.authToken}`
      }
    });
  
    socket.on("connect", () => {
      const connectData = {
        dateConnected: new Date(),
        socketId: socket.id
      }
      
      console.log({connectData});
    });
    
    socket.on("disconnect", () => {
      const disconnectData = {
        dateDisconnected: new Date(),
        socketId: socket.id
      }
      
      console.log({disconnectData});
    });

    socket.on("event_name_1", (payloadEvent1) => {
      console.log({payloadEvent1});
    });

    socket.on("event_name_2", (payloadEvent2) => {
      console.log({payloadEvent2});
    });
  }
}