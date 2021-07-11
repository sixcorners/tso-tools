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
    if (!this.ctx) return;
    if (this.navigator.current.nodeChart.name != 'jnw') return;
    let { relative_id } = this.navigator.current.node;
    if (relative_id == 0) {
      let { width, height } = this.canvas.nativeElement;
      this.ctx.clearRect(0, 0, width, height);
    }
  }

  private nodes = [
    [9, 489], // 0
    [177, 57], // 1
    [345, 57], // 2
    [345, 129], // 3
    [513, 129], // 4
    [681, 129], // 5
    [345, 201], // 6
    [513, 201], // 7
    [681, 201], // 8
    [177, 273], // 9
    [345, 273], // 10
    [513, 273], // 11
    [513, 345], // 12
    [513, 417], // 13
    [345, 489], // 14
    [513, 489], // 15
    [681, 489], // 16
    [513, 561], // 17
    [513, 633], // 18
    [345, 705], // 19
    [513, 705], // 20
    [177, 777], // 21
    [345, 777], // 22
    [513, 777], // 23
    [681, 777], // 24
    [513, 849], // 25
    [345, 921], // 26
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
