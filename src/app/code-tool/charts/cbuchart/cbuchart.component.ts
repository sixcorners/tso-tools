import { Component } from '@angular/core';

@Component({
  selector: 'app-cbuchart',
  templateUrl: './cbuchart.component.html',
  styleUrls: ['./cbuchart.component.scss']
})
export class CbuchartComponent {
  constructor() { }

  click({offsetX, offsetY}: MouseEvent) {
    console.log([offsetX, offsetY]);
  }
}
