import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pizza-tool',
  templateUrl: './pizza-tool.component.html',
  styleUrls: ['./pizza-tool.component.scss']
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

  constructor() {
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
    console.log(`!bake ${Object.values(this.model).map(r => r.selection).join(' ')}`);
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
      console.log(`!ingrediants ${role} ${ingrediants}`);
  }
}
