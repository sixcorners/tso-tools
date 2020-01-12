import { Component, OnInit } from '@angular/core';
import { ChartNavigatorService } from './chart-navigator.service';

@Component({
  selector: 'app-code-tool',
  templateUrl: './code-tool.component.html',
  styleUrls: ['./code-tool.component.scss']
})
export class CodeToolComponent implements OnInit {

  constructor(readonly navigator: ChartNavigatorService) { }

  ngOnInit() {
  }

}
