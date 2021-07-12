import { AfterViewInit, Component, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { ChartNavigatorService } from '../../chart-navigator.service';
import { CbuthraxisoptService } from './cbuthraxisopt.service';

@Component({
  selector: 'app-cbuthraxisopt',
  templateUrl: './cbuthraxisopt.component.html',
  styleUrls: ['./cbuthraxisopt.component.scss']
})
export class CbuthraxisoptComponent implements AfterViewInit, DoCheck {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  private ctx?: CanvasRenderingContext2D;

  constructor(private chart: CbuthraxisoptService, private navigator: ChartNavigatorService) { }

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
    if (this.navigator.current.nodeChart.name != 'cbuthraxisopt') return;
    let { relative_id } = this.navigator.current.node;
    if (relative_id == 0) {
      let { width, height } = this.canvas.nativeElement;
      this.ctx.clearRect(0, 0, width, height);
    }
  }

  click({ offsetX, offsetY }: MouseEvent) {
    for (let i = this.chart.locations.length - 1; i >= 0; i--) {
      let [x, y] = this.chart.locations[i];
      x = offsetX - x;
      y = offsetY - y;
      if (x >= 0 && x <= this.chart.width && y >= 0 && y <= this.chart.height)
        this.navigator.moveNodeRelative(i);
    }
  }
}
