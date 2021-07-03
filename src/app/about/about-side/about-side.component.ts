import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/room/room.service';

@Component({
  selector: 'app-about-side',
  templateUrl: './about-side.component.html',
  styleUrls: ['./about-side.component.scss']
})
export class AboutSideComponent implements OnInit {
  private lastTimestamp = -Number.MAX_VALUE;
  private lastRoomName: string;
  readonly history = [];
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

  ngOnInit(): void {
  }

}
