import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cbuthraxisopt',
  templateUrl: './cbuthraxisopt.component.html',
  styleUrls: ['./cbuthraxisopt.component.scss']
})
export class CbuthraxisoptComponent implements OnInit {
  @Input() current: any;

  constructor() { }

  ngOnInit(): void {
  }

}
