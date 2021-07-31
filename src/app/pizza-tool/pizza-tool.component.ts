import { Component } from '@angular/core';
import { RoomService } from '../room/room.service';
import { PizzaModelService } from './pizza-model.service';

// https://github.com/riperiperi/FreeSO/blob/master/TSOClient/tso.simantics/NetPlay/EODs/Handlers/VMEODPizzaMakerPlugin.cs
@Component({
  selector: 'app-pizza-tool',
  templateUrl: './pizza-tool.component.html',
  styleUrls: ['./pizza-tool.component.scss']
})
export class PizzaToolComponent {
  readonly slots = [1, 2, 3] as const;
  constructor(private room: RoomService, private modelService: PizzaModelService) { }

  get roles() {
    return this.modelService.roles;
  }

  get model() {
    return this.modelService.model;
  }

  get ready() {
    for (let { selection } of Object.values(this.model))
      if (!selection)
        return false;
    return true;
  }

  bake() {
    this.room.sendMessage(`!bake ${Object.values(this.model).map(r => r.selection).join(' ')}`);
  }

  newIngredient(role: string) {
    let value = this.model[role];
    value.lastSelection = undefined;
    value.lastSelectionIngredient = undefined;
    let ingrediants = `${value[1]} ${value[2]} ${value[3]}`
    if (ingrediants.length == 8)
      this.room.sendMessage(`!ingredients ${role} ${ingrediants}`);
  }
}
