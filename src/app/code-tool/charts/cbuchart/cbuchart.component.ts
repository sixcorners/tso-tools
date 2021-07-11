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
  }

  private nodes = [
    [1, 619],
    [137, 177],
    [281, 89],
    [281, 177],
    [434, 137],
    [434, 177],
    [434, 217],
    [281, 322],
    [434, 281],
    [434, 322],
    [434, 362],
    [137, 619],
    [281, 482],
    [434, 442],
    [434, 482],
    [434, 522],
    [281, 619],
    [434, 579],
    [570, 579],
    [434, 619],
    [434, 659],
    [281, 715],
    [434, 715],
    [137, 844],
    [281, 804],
    [434, 804],
    [281, 844],
    [434, 844],
    [281, 884],
    [434, 884],
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
