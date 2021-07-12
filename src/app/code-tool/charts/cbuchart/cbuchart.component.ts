import { AfterViewInit, Component, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { ChartNavigatorService } from '../../chart-navigator.service';
import { CbuchartService } from './cbuchart.service';

@Component({
  selector: 'app-cbuchart',
  templateUrl: './cbuchart.component.html',
  styleUrls: ['./cbuchart.component.scss']
})
export class CbuchartComponent implements AfterViewInit, DoCheck {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  private ctx?: CanvasRenderingContext2D;

  constructor(private chart: CbuchartService, private navigator: ChartNavigatorService) { }

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
    if (this.navigator.current.nodeChart.name != 'cbuchart') return;
    let { relative_id } = this.navigator.current.node;
    if (relative_id == 0) {
      let { width, height } = this.canvas.nativeElement;
      this.ctx.clearRect(0, 0, width, height);
    }
  }

  click({ offsetX, offsetY }: MouseEvent) {
    let { width, height } = this.chart;
    this.chart.locations.forEach(([x, y], relative_id) => {
      x = offsetX - x;
      y = offsetY - y;
      if (x >= 0 && x <= width && y >= 0 && y <= height)
        this.navigator.moveNodeRelative(relative_id);
    });
  }
}
