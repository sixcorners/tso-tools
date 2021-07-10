import { Component } from '@angular/core';
import { PizzaModelService } from '../pizza-model.service';

@Component({
  selector: 'app-pizza-side',
  templateUrl: './pizza-side.component.html',
  styleUrls: ['./pizza-side.component.scss']
})
export class PizzaSideComponent {
  constructor(readonly model: PizzaModelService) { }
}
