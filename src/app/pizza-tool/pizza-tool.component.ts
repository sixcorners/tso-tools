import { Component, Injectable, OnInit } from '@angular/core';
import { RoomService } from '../room/room.service';

@Component({
  selector: 'app-pizza-tool',
  templateUrl: './pizza-tool.component.html',
  styleUrls: ['./pizza-tool.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class PizzaToolComponent implements OnInit {
  readonly roles = ['body', 'cooking1', 'chrisma', 'cooking2'];
  readonly model: {
    [key: string]: {
      1?: string,
      2?: string,
      3?: string,
      selection?: number,
      lastSelection?: number,
    }
  } = {};

  constructor(private room: RoomService) {
    for (let role of this.roles)
      this.model[role] = {};
  }

  ngOnInit() {
  }

  get ready() {
    for (let { selection } of Object.values(this.model))
      if (!selection)
        return false;
    return true;
  }

  bake() {
    this.room.sendMessage(`!bake ${Object.values(this.model).map(r => r.selection).join(' ')}`);
    for (let value of Object.values(this.model)) {
      value.lastSelection = value[value.selection];
      value[value.selection] = undefined;
      value.selection = undefined;
    }
  }

  newIngrediant(role: string) {
    let value = this.model[role];
    value.lastSelection = undefined;
    let ingrediants = `${value[1]} ${value[2]} ${value[3]}`
    if (ingrediants.length == 8)
      this.room.sendMessage(`!ingrediants ${role} ${ingrediants}`);
  }
}
