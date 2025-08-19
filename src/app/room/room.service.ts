import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { nanoid } from 'nanoid';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  name = 'offline';
  private readonly clientId = nanoid();
  private readonly ws = new ReconnectingWebSocket(() => `wss://edge-chat-demo.cloudflareworkers.com/api/room/Tso-Tools-${this.name}/websocket`, undefined, { startClosed: true });

  constructor(snackBar: MatSnackBar) {
    this.ws.addEventListener('error', event => {
      console.error('WebSocket error:', event);
      snackBar.open(`WebSocket error: ${event}`, 'OK');
    });
    this.ws.addEventListener('message', event => {
      const data = JSON.parse(event.data);
      if (!data.error) return;
      console.error('Server error:', data.error);
      snackBar.open(`Server error: ${data.error}`, 'OK');
    });
    this.ws.addEventListener('open', () => {
      this.send(JSON.stringify({ name: this.clientId }));
    });
  }

  subscribe(route: ActivatedRoute) {
    route.paramMap.subscribe(params => {
      const name = params.get('room') ?? 'offline';
      if (this.name === name) return;
      this.name = name;
      if (name === 'offline') return this.ws.close();
      this.ws.reconnect();
    });
  }

  addEventListener<K extends keyof WebSocketEventMap>(type: K, listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener(...args: Parameters<ReconnectingWebSocket['addEventListener']>) {
    this.ws.addEventListener(...args);
  }

  sendMessage(message: string) {
    this.send(JSON.stringify({ name: this.clientId, message, timestamp: Date.now() }));
  }

  private send(data: Parameters<ReconnectingWebSocket['send']>[0]) {
    if (this.ws.readyState == WebSocket.OPEN) return this.ws.send(data);
    this.ws.dispatchEvent(new MessageEvent('message', { data }));
  }
}
