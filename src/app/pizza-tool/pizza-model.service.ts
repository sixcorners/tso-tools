import { Injectable } from '@angular/core';
import { RoomService } from '../room/room.service';

@Injectable({
  providedIn: 'root'
})
export class PizzaModelService {
  readonly roles = ['body', 'cooking1', 'chrisma', 'cooking2'];
  readonly model: {
    [key: string]: {
      1?: string,
      2?: string,
      3?: string,
      selection?: number,
      lastSelection?: number,
      lastSelectionIngredient?: string,
    }
  } = {};

  constructor(private room: RoomService) {
    for (let role of this.roles)
      this.model[role] = {};
  }

  bake() {
    for (let value of Object.values(this.model)) {
      value.lastSelection = value.selection;
      value.lastSelectionIngredient = value[value.selection]
      value[value.selection] = undefined;
      value.selection = undefined;
    }
  }
}
