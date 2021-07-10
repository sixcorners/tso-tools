import { Component, ElementRef, ViewChild } from '@angular/core';
import { RoomService } from '../room/room.service';
import { ChartNavigatorService } from './chart-navigator.service';

@Component({
  selector: 'app-code-tool',
  templateUrl: './code-tool.component.html',
  styleUrls: ['./code-tool.component.scss']
})
export class CodeToolComponent {
  @ViewChild('info') info!: ElementRef<HTMLDivElement>;
  @ViewChild('chart') chart!: ElementRef<HTMLDivElement>;

  constructor(readonly navigator: ChartNavigatorService, private room: RoomService) { }

  moveNode(node: any) {
    if (!node) return;
    this.room.sendMessage(`!moveNode ${node.id}`);
  }

  showHideInfo() {
    setTimeout(() => this.info.nativeElement.style.display = this.chart.nativeElement.offsetLeft ? 'block' : '', 0);
  }
}
