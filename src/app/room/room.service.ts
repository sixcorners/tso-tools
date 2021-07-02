import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor() { }

  room: string;
  private ws: WebSocket;
  private lastTimestamp = -Number.MAX_VALUE;
  private timeSinceLastJoin = -Number.MAX_VALUE;
  private lastJoin: ReturnType<typeof setTimeout>;
  readonly messages = [];

  send(msg: string | ArrayBufferLike | Blob | ArrayBufferView) {
    this.ws.send(msg);
  }

  changeRoom(room: string, initialMsg: string | ArrayBuffer | Blob | ArrayBufferView = null) {
    // cancel pending changes
    if (this.lastJoin) {
      clearTimeout(this.lastJoin);
      this.lastJoin = null;
    }

    // cleanup
    if (this.room != room) {
      this.room = room;
      this.lastTimestamp = -Number.MAX_VALUE;
      this.messages.length = 0;
      if (this.ws) {
        this.ws.close();
        this.ws = null;
      }
    }

    // check if this is a disconnect
    if (!room) {
      return;
    }

    // rate limit
    let now = Date.now();
    let timeUntilNextJoin = 10000 - now + this.timeSinceLastJoin;
    if (timeUntilNextJoin > 0) {
      this.lastJoin = setTimeout(() => {
        this.changeRoom(room, initialMsg);
      }, timeUntilNextJoin + 500);
      return;
    }
    this.timeSinceLastJoin = now;

    // connect
    this.ws = new WebSocket(`wss://edge-chat-demo.cloudflareworkers.com/api/room/${room}/websocket`)
    if (initialMsg) this.ws.addEventListener('open', e => this.send(initialMsg));
    this.ws.addEventListener('close', e => this.changeRoom(this.room));
    this.ws.addEventListener('error', e => this.changeRoom(this.room));
    this.ws.addEventListener('message', ({data}) => {
      if (this.lastTimestamp >= data.timestamp) {
        return;
      }
      this.lastTimestamp = data.timestamp;
      this.messages.push(data);
      if (this.messages.length >= 200) {
        this.messages.shift();
      }
    });
  }  
}
