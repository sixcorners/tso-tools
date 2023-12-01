import { Component } from '@angular/core';
import { PizzaModelService } from '../pizza-model.service';
import { NgFor } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-pizza-side',
  standalone: true,
  imports: [
    NgFor,
    MatToolbarModule,
    MatListModule,
  ],
  templateUrl: './pizza-side.component.html',
  styleUrl: './pizza-side.component.scss'
})
export class PizzaSideComponent {
  constructor(readonly model: PizzaModelService) { }
}
