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
    [1, 402],
    [129, 169],
    [265, 89],
    [265, 169],
    [394, 169],
    [522, 169],
    [265, 241],
    [394, 241],
    [522, 241],
    [129, 402],
    [265, 346],
    [394, 346],
    [522, 346],
    [265, 450],
    [394, 418],
    [522, 418],
    [394, 474],
    [522, 474],
    [634, 474],
    [265, 546],
    [394, 546],
    [522, 546],
    [129, 699],
    [265, 667],
    [394, 643],
    [522, 643],
    [394, 691],
    [265, 731],
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
