import { Component, OnInit } from '@angular/core';
import { ChartNavigatorService } from '../chart-navigator.service';

@Component({
  selector: 'app-code-side',
  templateUrl: './code-side.component.html',
  styleUrls: ['./code-side.component.scss']
})
export class CodeSideComponent implements OnInit {

  constructor(readonly navigator: ChartNavigatorService) { }

  ngOnInit(): void {
  }

}
