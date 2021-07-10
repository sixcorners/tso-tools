import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cbuchart',
  templateUrl: './cbuchart.component.html',
  styleUrls: ['./cbuchart.component.scss']
})
export class CbuchartComponent implements OnInit {
  @Input() current: any;

  constructor() { }

  ngOnInit(): void {
  }

}
