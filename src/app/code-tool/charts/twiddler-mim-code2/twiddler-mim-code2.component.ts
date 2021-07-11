import { Component, Input } from '@angular/core';
import { ChartNavigatorService } from '../../chart-navigator.service';

@Component({
  selector: 'app-twiddler-mim-code2',
  templateUrl: './twiddler-mim-code2.component.html',
  styleUrls: ['./twiddler-mim-code2.component.scss']
})
export class TwiddlerMimCode2Component {
  @Input() navigator!: ChartNavigatorService;

  constructor() { }
}
