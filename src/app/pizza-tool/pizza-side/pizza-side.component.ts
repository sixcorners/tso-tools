import { Component, OnInit } from '@angular/core';
import { PizzaModelService } from '../pizza-model.service';

@Component({
  selector: 'app-pizza-side',
  templateUrl: './pizza-side.component.html',
  styleUrls: ['./pizza-side.component.scss']
})
export class PizzaSideComponent implements OnInit {
  constructor(readonly model: PizzaModelService) { }

  ngOnInit(): void {
  }

}
