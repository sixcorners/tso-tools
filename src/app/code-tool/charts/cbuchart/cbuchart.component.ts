import { AfterViewInit, Component, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { ChartNavigatorService } from '../../chart-navigator.service';

@Component({
  selector: 'app-cbuchart',
  templateUrl: './cbuchart.component.html',
  styleUrls: ['./cbuchart.component.scss']
})
export class CbuchartComponent implements AfterViewInit, DoCheck {
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
    if (this.navigator.current.nodeChart.name != 'cbuchart') return;
    let { relative_id } = this.navigator.current.node;
    if (relative_id == 0) {
      let { width, height } = this.canvas.nativeElement;
      this.ctx.clearRect(0, 0, width, height);
    }
  }

  private nodes = [
    [1, 619], // 0
    [137, 177], // 1
    [281, 89], // 2
    [281, 177], // 3
    [434, 137], // 4
    [434, 177], // 5
    [434, 217], // 6
    [281, 322], // 7
    [434, 281], // 8
    [434, 322], // 9
    [434, 362], // 10
    [137, 619], // 11
    [281, 482], // 12
    [434, 442], // 13
    [434, 482], // 14
    [434, 522], // 15
    [281, 619], // 16
    [434, 579], // 17
    [570, 579], // 18
    [434, 619], // 19
    [434, 659], // 20
    [281, 715], // 21
    [434, 715], // 22
    [137, 844], // 23
    [281, 804], // 24
    [434, 804], // 25
    [281, 844], // 26
    [434, 844], // 27
    [281, 884], // 28
    [434, 884], // 29
  ];

  click({ offsetX, offsetY }: MouseEvent) {
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      let [x, y] = this.nodes[i];
      x = offsetX - x;
      y = offsetY - y;
      if (x >= 0 && x <= 55 && y >= 0 && y <= 31)
        this.navigator.moveNodeRelative(i);
    }
  }
}
