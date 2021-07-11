import { AfterViewInit, Component, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { ChartNavigatorService } from '../../chart-navigator.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit, DoCheck {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  private ctx?: CanvasRenderingContext2D;

  constructor(private navigator: ChartNavigatorService) { }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d') ?? undefined;
    if (this.ctx) this.ctx.strokeStyle = 'red';
    this.draw();
  }

  private lastNodeId = -1;
  ngDoCheck() {
    if (this.lastNodeId == this.navigator.current.node.id)
      return;
    this.lastNodeId = this.navigator.current.node.id;
    this.draw();
  }

  private draw() {
  }

  private nodes = [
    [0, 457],
    [202, 157],
    [402, 57],
    [402, 157],
    [602, 107],
    [602, 157],
    [602, 207],
    [402, 307],
    [602, 257],
    [602, 307],
    [602, 357],
    [202, 557],
    [402, 457],
    [602, 407],
    [602, 457],
    [602, 507],
    [402, 607],
    [602, 557],
    [802, 557],
    [602, 607],
    [602, 657],
    [402, 707],
    [602, 707],
    [202, 807],
    [402, 757],
    [602, 757],
    [402, 807],
    [602, 807],
    [402, 857],
    [602, 857],
  ];

  click({ offsetX, offsetY }: MouseEvent) {
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      let [x, y] = this.nodes[i];
      x = offsetX - x;
      y = offsetY - y;
      if (x >= 0 && x <= 58 && y >= 0 && y <= 24)
        this.navigator.moveNodeRelative(i);
    }
  }
}
