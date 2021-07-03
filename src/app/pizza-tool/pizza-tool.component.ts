import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pizza-tool',
  templateUrl: './pizza-tool.component.html',
  styleUrls: ['./pizza-tool.component.scss']
})
export class PizzaToolComponent implements OnInit {
  readonly roles = ['body', 'cooking1', 'chrisma', 'cooking2'];
  readonly model = {};

  constructor() {
    for (let role of this.roles)
      this.model[role] = [];
  }

  ngOnInit() {
  }

  click(role: string) {
    console.log(role, JSON.stringify(this.model));
  }
}
