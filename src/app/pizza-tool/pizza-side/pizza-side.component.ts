import { Component } from '@angular/core';
import { PizzaModelService } from '../pizza-model.service';

@Component({
  selector: 'app-pizza-side',
  standalone: true,
  imports: [],
  templateUrl: './pizza-side.component.html',
  styleUrl: './pizza-side.component.scss'
})
export class PizzaSideComponent {
  constructor(readonly model: PizzaModelService) { }
}
