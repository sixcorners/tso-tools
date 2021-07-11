import { AfterViewInit, Component, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { ChartNavigatorService } from '../../chart-navigator.service';

@Component({
  selector: 'app-cbuthraxisopt',
  templateUrl: './cbuthraxisopt.component.html',
  styleUrls: ['./cbuthraxisopt.component.scss']
})
export class CbuthraxisoptComponent implements AfterViewInit, DoCheck {
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
    [1, 402], // 0
    [129, 169], // 1
    [265, 89], // 2
    [265, 169], // 3
    [394, 169], // 4
    [522, 169], // 5
    [265, 241], // 6
    [394, 241], // 7
    [522, 241], // 8
    [129, 402], // 9
    [265, 346], // 10
    [394, 346], // 11
    [522, 346], // 12
    [265, 450], // 13
    [394, 418], // 14
    [522, 418], // 15
    [394, 474], // 16
    [522, 474], // 17
    [634, 474], // 18
    [265, 546], // 19
    [394, 546], // 20
    [522, 546], // 21
    [129, 699], // 22
    [265, 667], // 23
    [394, 643], // 24
    [522, 643], // 25
    [394, 691], // 26
    [265, 731], // 27
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
