import { Component, OnInit, HostListener } from '@angular/core';
import { ChartNavigatorService } from '../../chart-navigator.service';

@Component({
  selector: 'app-tso0112',
  templateUrl: './tso0112.component.html',
  styleUrls: ['./tso0112.component.scss'],
  preserveWhitespaces: true
})
export class Tso0112Component implements OnInit {

  constructor(private navigator: ChartNavigatorService) { }

  ngOnInit(): void {
  }

  @HostListener("click", ['$event.target.dataset.node']) onClick(node) {
    if (node) this.navigator.moveNodeRelative(node);
  }
}
