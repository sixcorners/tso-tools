import { AfterViewInit, Component, DoCheck, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ChartNavigatorService } from '../../chart-navigator.service';
import { CbuthraxisoptService } from './cbuthraxisopt.service';

@Component({
  selector: 'app-cbuthraxisopt',
  imports: [],
  templateUrl: './cbuthraxisopt.component.html',
  styleUrl: './cbuthraxisopt.component.scss'
})
export class CbuthraxisoptComponent implements AfterViewInit, DoCheck {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  private ctx?: CanvasRenderingContext2D;

  constructor(private chart: CbuthraxisoptService, private navigator: ChartNavigatorService) { }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d') ?? undefined;
    if (this.ctx) this.ctx.strokeStyle = 'red';
    this.ngDoCheck();
  }

  private clear() {
    const { width, height } = this.canvas.nativeElement;
    this.ctx?.clearRect(0, 0, width, height);
  }

  private lastNodeId = -1;
  ngDoCheck() {
    if (!this.ctx) return;
    const { id, relative_id, parent_id } = this.navigator.current.node;
    if (this.lastNodeId == id) return;
    if (relative_id == 0) this.clear();
    if (this.navigator.current.nodeChart.name == this.chart.name) {
      const [circle, arrow] = this.chart.drawings[relative_id];
      this.ctx.stroke(circle);
      if (arrow && this.lastNodeId == parent_id)
        this.ctx.stroke(arrow);
    }
    this.lastNodeId = id;
  }

  @HostListener('click', ['$event'])
  click({ offsetX, offsetY }: MouseEvent) {
    const { width, height } = this.chart;
    this.chart.locations.forEach(([nodeX, nodeY], relative_id) => {
      const x = offsetX - nodeX;
      const y = offsetY - nodeY;
      if (x >= 0 && x <= width && y >= 0 && y <= height)
        this.navigator.moveNodeRelative(relative_id);
    });
  }
}
