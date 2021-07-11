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
    if (!this.ctx) return;
    if (this.navigator.current.nodeChart.name != 'twiddler_mim_code2') return;
    let { relative_id } = this.navigator.current.node;
    if (relative_id == 0) {
      let { width, height } = this.canvas.nativeElement;
      this.ctx.clearRect(0, 0, width, height);
    }
  }

  private nodes = [
    [60, 276], // 0
    [148, 196], // 1
    [425, 174], // 2
    [243, 234], // 3
    [425, 216], // 4
    [327, 246], // 5
    [425, 257], // 6
    [148, 400], // 7
    [243, 319], // 8
    [425, 332], // 9
    [243, 386], // 10
    [425, 377], // 11
    [425, 400], // 12
    [328, 431], // 13
    [425, 442], // 14
    [243, 482], // 15
    [425, 495], // 16
    [425, 518], // 17
    [425, 541], // 18
    [147, 648], // 19
    [244, 602], // 20
    [326, 625], // 21
    [425, 636], // 22
    [244, 677], // 23
    [326, 691], // 24
    [425, 703], // 25
    [425, 725], // 26
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
