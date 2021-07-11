import { Component } from '@angular/core';

@Component({
  selector: 'app-cbuthraxisopt',
  templateUrl: './cbuthraxisopt.component.html',
  styleUrls: ['./cbuthraxisopt.component.scss']
})
export class CbuthraxisoptComponent {
  constructor() { }

  click({offsetX, offsetY}: MouseEvent) {
    console.log([offsetX, offsetY]);
  }
}
