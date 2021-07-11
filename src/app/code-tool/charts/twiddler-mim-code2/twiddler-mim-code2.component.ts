import { Component } from '@angular/core';

@Component({
  selector: 'app-twiddler-mim-code2',
  templateUrl: './twiddler-mim-code2.component.html',
  styleUrls: ['./twiddler-mim-code2.component.scss']
})
export class TwiddlerMimCode2Component {
  constructor() { }

  click({offsetX, offsetY}: MouseEvent) {
    console.log([offsetX, offsetY]);
  }
}
