import { Injectable } from '@angular/core';
import { RoomService } from '../room/room.service';

@Injectable({
  providedIn: 'root'
})
export class PizzaModelService {
  readonly roles = ['body', 'cooking1', 'chrisma', 'cooking2'] as const;
  readonly model: {
    [key: string]: {
      1?: string,
      2?: string,
      3?: string,
      selection?: 1 | 2 | 3,
      lastSelection?: 1 | 2 | 3,
      lastSelectionIngredient?: string,
    }
  } = {};
  private lastTimestamp = -Number.MAX_VALUE;
  private lastRoomName?: string;
  readonly history: any[] = [];

  constructor(private room: RoomService) {
    for (let role of this.roles)
      this.model[role] = {};

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
          let role = this.model[match[1]];
          for (let i of [1, 2, 3] as const)
            role[i] = match[i + 1];
          data.parsed = `${match[1]} has ${match[2]} ${match[3]} ${match[4]}`;
        }
      }
      {
        let match = data.message.match(/!bake (\d) (\d) (\d) (\d)/);
        if (match) {
          for (let i = 0; i < 4; i++)
            this.model[this.roles[i]].selection = match[i + 1];
          this.bake();
          data.parsed = `Bake ${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
        }
      }
      this.history.push(data);
      if (this.history.length >= 120)
        this.history.shift();
    });
  }

  bake() {
    for (let value of Object.values(this.model)) {
      value.lastSelection = value.selection;
      value.lastSelectionIngredient = value[value.selection!]
      value[value.selection!] = undefined;
      value.selection = undefined;
    }
  }
}
