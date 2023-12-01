import { Injectable } from '@angular/core';
import { RoomService } from '../room/room.service';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private lastTimestamp = -Number.MAX_VALUE;
  private lastRoomName?: string;
  readonly history: any[] = [];
  constructor(room: RoomService) {
    room.addEventListener('message', ({ data }) => {
      if (this.lastRoomName != room.name) {
        this.lastRoomName = room.name;
        this.lastTimestamp = -Number.MAX_VALUE;
        this.history.length = 0;
      }
      data = JSON.parse(data);
      if (this.lastTimestamp >= data.timestamp)
        return;
      if (!data.message)
        return;
      this.lastTimestamp = data.timestamp;
      this.history.push(data);
      if (this.history.length >= 120)
        this.history.shift();
    });
  }
}
