import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/room/room.service';
import { ChartNavigatorService } from '../chart-navigator.service';

@Component({
  selector: 'app-code-side',
  templateUrl: './code-side.component.html',
  styleUrls: ['./code-side.component.scss']
})
export class CodeSideComponent implements OnInit {
  private lastTimestamp = -Number.MAX_VALUE;
  private lastRoomName?: string;
  readonly history: any[] = [];
  constructor(private room: RoomService, private navigator: ChartNavigatorService) {
    room.addEventListener('message', async ({ data }) => {
      if (this.lastRoomName != room.name) {
        this.lastRoomName = room.name;
        this.lastTimestamp = -Number.MAX_VALUE;
        this.history.length = 0;
        this.navigator.reset();
      }
      data = JSON.parse(data);
      if (this.lastTimestamp >= data.timestamp)
        return;
      if (!data.message)
        return;
      this.lastTimestamp = data.timestamp;
      {
        let match = data.message.match(/!moveNode (\d+)/);
        if (match) {
          await this.navigator.moveNode(+match[1]);
          data.node = this.navigator.currentNode.node;
          data.parsed = `Moved to ${data.node.combination}`;
        }
      }
      this.history.push(data);
      if (this.history.length >= 120)
        this.history.shift();
    });
  }

  ngOnInit(): void {
  }

  click(entry: any) {
    if (entry.node)
      this.room.sendMessage(`!moveNode ${entry.node.id}`);
  }
}
