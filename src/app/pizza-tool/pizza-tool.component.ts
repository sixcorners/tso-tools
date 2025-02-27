import { Component } from '@angular/core';
import { RoomService } from '../room/room.service';
import { PizzaModelService } from './pizza-model.service';
import { NgFor, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';

// https://github.com/riperiperi/FreeSO/blob/master/TSOClient/tso.simantics/NetPlay/EODs/Handlers/VMEODPizzaMakerPlugin.cs
@Component({
  selector: 'app-pizza-tool',
  imports: [
    NgFor,
    TitleCasePipe,
    FormsModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatButtonModule,
  ],
  templateUrl: './pizza-tool.component.html',
  styleUrl: './pizza-tool.component.scss'
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
    for (const { selection } of Object.values(this.model))
      if (selection)
        return true;
    return false;
  }

  bake() {
    this.room.sendMessage(`!bake ${Object.values(this.model).map(r => r.selection ?? '?').join(' ')}`);
  }

  newIngredient(role: string) {
    const value = this.model[role];
    value.lastSelection = undefined;
    value.lastSelectionIngredient = undefined;
    this.modelService.sendIngrediants(role);
  }
}
