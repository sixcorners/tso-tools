import { AfterViewInit, Component, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { ChartNavigatorService } from '../../chart-navigator.service';

@Component({
  selector: 'app-jnw',
  templateUrl: './jnw.component.html',
  styleUrls: ['./jnw.component.scss']
})
export class JnwComponent implements AfterViewInit, DoCheck {
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
    [9, 489],
    [177, 57],
    [345, 57],
    [345, 129],
    [513, 129],
    [681, 129],
    [345, 201],
    [513, 201],
    [681, 201],
    [177, 273],
    [345, 273],
    [513, 273],
    [513, 345],
    [513, 417],
    [345, 489],
    [513, 489],
    [681, 489],
    [513, 561],
    [513, 633],
    [345, 705],
    [513, 705],
    [177, 777],
    [345, 777],
    [513, 777],
    [681, 777],
    [513, 849],
    [345, 921],
  ];

  click({ offsetX, offsetY }: MouseEvent) {
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      let [x, y] = this.nodes[i];
      x = offsetX - x;
      y = offsetY - y;
      if (x >= 0 && x <= 61 && y >= 0 && y <= 49)
        this.navigator.moveNodeRelative(i);
    }
  }
}
