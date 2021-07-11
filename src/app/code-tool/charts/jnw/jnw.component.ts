import { Component } from '@angular/core';

@Component({
  selector: 'app-jnw',
  templateUrl: './jnw.component.html',
  styleUrls: ['./jnw.component.scss']
})
export class JnwComponent {
  constructor() { }

  click({offsetX, offsetY}: MouseEvent) {
    console.log([offsetX, offsetY]);
  }
}
