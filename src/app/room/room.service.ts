import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { nanoid } from 'nanoid';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  name?: string;
  private timeSinceLastJoin = -Number.MAX_VALUE;
  private lastTimestamp = -Number.MAX_VALUE;
  private clientId = nanoid();
  private ws?: WebSocket;
  private lastJoin?: ReturnType<typeof setTimeout>;
  private eventListeners: Parameters<WebSocket['addEventListener']>[] = [];
  readonly history: MessageEvent[] = [];

  constructor(private snackBar: MatSnackBar) { }

  addEventListener<K extends keyof WebSocketEventMap>(...args: [type: K, listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any, options?: boolean | AddEventListenerOptions]) {
    this.eventListeners.push(args as any);
    this.ws?.addEventListener(...args);
    const [type, listener] = args;
    if (type != 'message')
      return;
    for (const item of this.history)
      listener.call(this.ws!, item as any);
  }

  sendMessage(message: string) {
    this.send({ 'server-echo': true, message, clientId: this.clientId });
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
    const event = new MessageEvent('message', { data });
    for (const [type, listener] of this.eventListeners) {
      if (type != 'message')
        continue;
      if ('handleEvent' in listener)
        listener.handleEvent(event);
      else
        listener(event);
    }
  }

  changeRoom(name?: string, ...initialSend: Parameters<RoomService['sendMessage']> | []) {
    // cancel pending changes
    if (this.lastJoin) {
      clearTimeout(this.lastJoin);
      this.lastJoin = undefined;
    }

    if (this.name == name)
      return;
    this.name = name;

    // cleanup
    this.ws?.close();
    this.ws = undefined;
    this.history.length = 0;

    // check if this is a disconnect
    if (!name || name === 'offline')
      return;

    // rate limit
    const now = Date.now();
    const timeUntilNextJoin = 10000 - now + this.timeSinceLastJoin;
    if (timeUntilNextJoin > 0) {
      this.lastJoin = setTimeout(() => this.changeRoom(name, ...initialSend), timeUntilNextJoin + 500);
      return;
    }
    this.timeSinceLastJoin = now;

    // connect
    this.ws = new WebSocket(`wss://togetherjs-hub.glitch.me/hub/tso-tools-${name}`);
    this.ws.addEventListener('error', event => {
      console.error('WebSocket error:', event);
      this.snackBar.open(`WebSocket error: ${event}`, 'OK');
      this.changeRoom(this.name);
    });
    this.ws.addEventListener('message', event => {
      this.history.push(event);
      const data = JSON.parse(event.data);
      if (data.error) {
        console.error('Server sent error:', data.error);
        this.snackBar.open(`Server sent error: ${data.error}`, 'OK');
      }
    });
    for (const listener of this.eventListeners)
      this.ws.addEventListener(...listener);
    if (initialSend.length)
      this.ws.addEventListener('open', () => this.sendMessage(...initialSend));
  }
}
