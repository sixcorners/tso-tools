import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/room/room.service';
import { PizzaModelService } from '../pizza-model.service';

@Component({
  selector: 'app-pizza-side',
  templateUrl: './pizza-side.component.html',
  styleUrls: ['./pizza-side.component.scss']
})
export class PizzaSideComponent implements OnInit {
  private lastTimestamp = -Number.MAX_VALUE;
  private lastRoomName?: string;
  readonly history: any[] = [];
  constructor(room: RoomService, tool: PizzaModelService) {
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
      {
        let match = data.message.match(/!ingredients (.+?) (..) (..) (..)/);
        if (match) {
          let role = tool.model[match[1]];
          for (let i of [1, 2, 3] as const)
            role[i] = match[i + 1];
          data.parsed = `${match[1]} has ${match[2]} ${match[3]} ${match[4]}`;
        }
      }
      {
        let match = data.message.match(/!bake (\d) (\d) (\d) (\d)/);
        if (match) {
          for (let i = 0; i < 4; i++)
            tool.model[tool.roles[i]].selection = match[i + 1];
          tool.bake();
          data.parsed = `Bake ${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
        }
      }
      this.history.push(data);
      if (this.history.length >= 120)
        this.history.shift();
    });
  }

  ngOnInit(): void {
  }

}
