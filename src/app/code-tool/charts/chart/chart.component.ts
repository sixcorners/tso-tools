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
    if (!this.ctx) return;
    if (this.navigator.current.nodeChart.name != 'chart') return;
    let { relative_id } = this.navigator.current.node;
    if (relative_id == 0) {
      let { width, height } = this.canvas.nativeElement;
      this.ctx.clearRect(0, 0, width, height);
    }
  }

  private nodes = [
    [0, 457], // 0
    [202, 157], // 1
    [402, 57], // 2
    [402, 157], // 3
    [602, 107], // 4
    [602, 157], // 5
    [602, 207], // 6
    [402, 307], // 7
    [602, 257], // 8
    [602, 307], // 9
    [602, 357], // 10
    [202, 557], // 11
    [402, 457], // 12
    [602, 407], // 13
    [602, 457], // 14
    [602, 507], // 15
    [402, 607], // 16
    [602, 557], // 17
    [802, 557], // 18
    [602, 607], // 19
    [602, 657], // 20
    [402, 707], // 21
    [602, 707], // 22
    [202, 807], // 23
    [402, 757], // 24
    [602, 757], // 25
    [402, 807], // 26
    [602, 807], // 27
    [402, 857], // 28
    [602, 857], // 29
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
