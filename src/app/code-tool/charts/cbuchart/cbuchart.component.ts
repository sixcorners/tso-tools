import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cbuchart',
  templateUrl: './cbuchart.component.html',
  styleUrls: ['./cbuchart.component.scss']
})
export class CbuchartComponent {
  @Input() current: any;

  constructor() { }
}
