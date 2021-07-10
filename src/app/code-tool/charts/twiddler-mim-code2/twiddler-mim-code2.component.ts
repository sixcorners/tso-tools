import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-twiddler-mim-code2',
  templateUrl: './twiddler-mim-code2.component.html',
  styleUrls: ['./twiddler-mim-code2.component.scss']
})
export class TwiddlerMimCode2Component implements OnInit {
  @Input() current: any;

  constructor() { }

  ngOnInit(): void {
  }

}
