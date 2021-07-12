import { AfterViewInit, Component, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { ChartNavigatorService } from '../../chart-navigator.service';
import { JnwService } from './jnw.service';

@Component({
  selector: 'app-jnw',
  templateUrl: './jnw.component.html',
  styleUrls: ['./jnw.component.scss']
})
export class JnwComponent implements AfterViewInit, DoCheck {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  private ctx?: CanvasRenderingContext2D;

  constructor(private chart: JnwService, private navigator: ChartNavigatorService) { }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d') ?? undefined;
    if (this.ctx) this.ctx.strokeStyle = 'red';
    this.ngDoCheck();
  }

  private lastNodeId = -1;
  ngDoCheck() {
    if (!this.ctx) return;
    let { id, relative_id, parent_id } = this.navigator.current.node;
    if (this.lastNodeId == id) return;
    if (relative_id == 0) {
      let { width, height } = this.canvas.nativeElement;
      this.ctx.clearRect(0, 0, width, height);
    }
    if (this.navigator.current.nodeChart.name == this.chart.name) {
      let [circle, arrow] = this.chart.drawings[relative_id];
      this.ctx.stroke(circle);
      if (arrow && this.lastNodeId == parent_id)
        this.ctx.stroke(arrow);
    }
    this.lastNodeId = id;
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
