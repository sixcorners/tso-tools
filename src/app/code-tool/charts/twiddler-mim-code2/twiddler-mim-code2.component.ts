import { AfterViewInit, Component, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { ChartNavigatorService } from '../../chart-navigator.service';

@Component({
  selector: 'app-twiddler-mim-code2',
  templateUrl: './twiddler-mim-code2.component.html',
  styleUrls: ['./twiddler-mim-code2.component.scss']
})
export class TwiddlerMimCode2Component implements AfterViewInit, DoCheck {
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
    [60, 276],
    [148, 196],
    [425, 174],
    [243, 234],
    [425, 216],
    [327, 246],
    [425, 257],
    [148, 400],
    [243, 319],
    [425, 332],
    [243, 386],
    [425, 377],
    [425, 400],
    [328, 431],
    [425, 442],
    [243, 482],
    [425, 495],
    [425, 518],
    [425, 541],
    [147, 648],
    [244, 602],
    [326, 625],
    [425, 636],
    [244, 677],
    [326, 691],
    [425, 703],
    [425, 725],
  ];

  click({ offsetX, offsetY }: MouseEvent) {
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      let [x, y] = this.nodes[i];
      x = offsetX - x;
      y = offsetY - y;
      if (x >= 0 && x <= 37 && y >= 0 && y <= 18)
        this.navigator.moveNodeRelative(i);
    }
  }
}
