import { Component } from '@angular/core';
import { PizzaModelService } from '../pizza-model.service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-pizza-side',
  imports: [
    MatToolbarModule,
    MatListModule
],
  templateUrl: './pizza-side.component.html',
  styleUrl: './pizza-side.component.scss'
})
export class PizzaSideComponent {
  constructor(readonly model: PizzaModelService) { }
}
