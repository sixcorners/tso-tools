import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-jnw',
  templateUrl: './jnw.component.html',
  styleUrls: ['./jnw.component.scss']
})
export class JnwComponent {
  @Input() current: any;

  constructor() { }
}
