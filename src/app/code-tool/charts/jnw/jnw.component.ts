import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-jnw',
  templateUrl: './jnw.component.html',
  styleUrls: ['./jnw.component.scss']
})
export class JnwComponent implements OnInit {
  @Input() current: any;

  constructor() { }

  ngOnInit(): void {
  }

}
