import { AfterViewInit, Component, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { ChartNavigatorService } from '../../chart-navigator.service';
import { TwiddlerMimCode2Service } from './twiddler-mim-code2.service';

@Component({
  selector: 'app-twiddler-mim-code2',
  templateUrl: './twiddler-mim-code2.component.html',
  styleUrls: ['./twiddler-mim-code2.component.scss']
})
export class TwiddlerMimCode2Component implements AfterViewInit, DoCheck {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  private ctx?: CanvasRenderingContext2D;

  constructor(private chart: TwiddlerMimCode2Service, private navigator: ChartNavigatorService) { }

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
    if (this.navigator.current.nodeChart.name != 'twiddler_mim_code2') return;
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
      if (x >= 0 && x <= 37 && y >= 0 && y <= 18)
        this.navigator.moveNodeRelative(i);
    }
  }
}
