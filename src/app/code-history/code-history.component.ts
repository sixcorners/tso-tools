import { Component, OnInit } from '@angular/core';
import { ChartNavigatorService } from '../code-tool/chart-navigator.service';

@Component({
  selector: 'app-code-history',
  templateUrl: './code-history.component.html',
  styleUrls: ['./code-history.component.scss']
})
export class CodeHistoryComponent implements OnInit {

  constructor(readonly navigator: ChartNavigatorService) { }

  ngOnInit(): void {
  }

}
