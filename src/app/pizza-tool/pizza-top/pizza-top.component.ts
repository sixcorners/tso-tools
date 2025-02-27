import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pizza-top',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './pizza-top.component.html',
  styleUrl: './pizza-top.component.scss'
})
export class PizzaTopComponent {

}
