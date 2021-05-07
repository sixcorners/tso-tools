import { Component, OnInit } from '@angular/core';
import { ChartNavigatorService } from '../../chart-navigator.service';

@Component({
  selector: 'app-tso0112',
  templateUrl: './tso0112.component.html',
  styleUrls: ['./tso0112.component.scss'],
  preserveWhitespaces: true
})
export class Tso0112Component implements OnInit {

  constructor(readonly navigator: ChartNavigatorService) { }

  ngOnInit(): void {
  }

}
