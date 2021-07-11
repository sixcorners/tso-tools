import { Component, HostListener, Input, HostBinding } from '@angular/core';
import { ChartNavigatorService } from '../../chart-navigator.service';

@Component({
  selector: 'app-tso0112',
  templateUrl: './tso0112.component.html',
  styleUrls: ['./tso0112.component.scss'],
  preserveWhitespaces: true
})
export class Tso0112Component {
  @Input() navigator!: ChartNavigatorService;
  @HostBinding('class') get class() {
    if (this.navigator.current.nodeChart.name != 'tso0112')
      return '';
    return `node-${this.navigator.current.node.relative_id}`;
  }

  constructor() { }

  @HostListener("click", ['$event.target.dataset.node']) onClick(node: number) {
    if (node) this.navigator.moveNodeRelative(node);
  }
}
