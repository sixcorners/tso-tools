import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  name?: string;
  private timeSinceLastJoin = -Number.MAX_VALUE;
  private lastTimestamp = -Number.MAX_VALUE;
  private ws?: WebSocket;
  private lastJoin?: ReturnType<typeof setTimeout>;
  private eventListeners: Parameters<WebSocket['addEventListener']>[] = [];

  constructor(private snackBar: MatSnackBar) { }

  addEventListener<K extends keyof WebSocketEventMap>(...args: [type: K, listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any, options?: boolean | AddEventListenerOptions]) {
    this.eventListeners.push(args as any);
    if (this.ws)
      this.ws.addEventListener(...args);
  }

  sendMessage(message: string) {
    this.send({ message });
  }

  private send(data: any) {
    if (this.ws)
      return this.ws.send(JSON.stringify(data));

    // simulated send
    let now = Date.now();
    if (now <= this.lastTimestamp)
      now = ++this.lastTimestamp;
    data.timestamp = now;

    data = JSON.stringify(data);
    let event = new MessageEvent('message', { data });
    for (let [type, listener] of this.eventListeners) {
      if (type != 'message')
        continue;
      if ('handleEvent' in listener)
        listener.handleEvent(event);
      else
        listener(event);
    }
  }

  changeRoom(name?: string, ...initialSend: Parameters<RoomService['send']> | []) {
    // cancel pending changes
    if (this.lastJoin) {
      clearTimeout(this.lastJoin);
      this.lastJoin = undefined;
    }

    if (this.name == name)
      return;

    // cleanup
    if (this.ws) {
      this.ws.close(1000, name);
      this.ws = undefined;
    }
    this.name = name;

    // check if this is a disconnect
    if (!name || name === 'offline')
      return;

    // rate limit
    let now = Date.now();
    let timeUntilNextJoin = 10000 - now + this.timeSinceLastJoin;
    if (timeUntilNextJoin > 0) {
      this.lastJoin = setTimeout(() => this.changeRoom(name, ...initialSend), timeUntilNextJoin + 500);
      return;
    }
    this.timeSinceLastJoin = now;

    // connect
    this.ws = new WebSocket(`${location.protocol == 'http:' ? 'ws' : 'wss'}://${location.host}/api/room/${name}/websocket`);
    this.ws.addEventListener('error', event => {
      console.error('WebSocket error:', event);
      this.snackBar.open(`WebSocket error: ${event}`, 'OK');
      this.changeRoom(this.name);
    });
    this.ws.addEventListener('message', ({ data }) => {
      data = JSON.parse(data);
      if (data.error) {
        console.error('Server sent error:', data.error);
        this.snackBar.open(`Server sent error: ${data.error}`, 'OK');
      }
    });
    for (let listener of this.eventListeners)
      this.ws.addEventListener(...listener);
    if (initialSend.length)
      this.ws.addEventListener('open', _ => this.send(...initialSend));
  }
}
