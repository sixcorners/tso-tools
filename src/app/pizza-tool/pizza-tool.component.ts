import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pizza-tool',
  templateUrl: './pizza-tool.component.html',
  styleUrls: ['./pizza-tool.component.scss']
})
export class PizzaToolComponent implements OnInit {
  readonly model = {
    body: [],
    cooking1: [],
    chrisma: [],
    cooking2: [],
  };
  readonly roles = Object.keys(this.model);

  constructor() { }

  ngOnInit() {
  }

  click(role: string) {
    console.log(role, JSON.stringify(this.model));
  }
}
