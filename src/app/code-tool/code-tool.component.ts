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
    if (this.room.name == 'offline')
      this.navigator.moveNode(node.id);
    else
      this.room.send(JSON.stringify({
        message: `!moveNode ${node.id}`,
      }));
  }
}
