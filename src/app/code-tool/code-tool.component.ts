import { Component, OnInit } from '@angular/core';
import { RoomService } from '../room/room.service';
import { ChartNavigatorService } from './chart-navigator.service';

@Component({
  selector: 'app-code-tool',
  templateUrl: './code-tool.component.html',
  styleUrls: ['./code-tool.component.scss']
})
export class CodeToolComponent implements OnInit {
  constructor(readonly navigator: ChartNavigatorService, private room: RoomService) { }

  ngOnInit() {
  }

  moveNode(node: any) {
    if (!node) return;
    this.room.sendMessage(`!moveNode ${node.id}`);
  }
}
