import { Component, HostListener, HostBinding } from '@angular/core';
import { ChartNavigatorService } from '../../chart-navigator.service';

@Component({
  selector: 'app-tso0112',
  imports: [],
  templateUrl: './tso0112.component.html',
  styleUrl: './tso0112.component.scss',
  preserveWhitespaces: true
})
export class Tso0112Component {
  @HostBinding('class') get class() {
    if (this.navigator.current?.nodeChart?.name != 'tso0112')
      return '';
    return `node-${this.navigator.current?.node?.relative_id}`;
  }

  constructor(private navigator: ChartNavigatorService) { }

  @HostListener("click", ['$event'])
  click($event: MouseEvent) {
    const node = ($event?.target as HTMLElement)?.dataset['node'];
    if (node) this.navigator.moveNodeRelative(+node);
  }
}
