import { Component } from '@angular/core';
import { RoomService } from 'src/app/room/room.service';
import { ChartNavigatorService } from '../chart-navigator.service';

@Component({
  selector: 'app-code-side',
  templateUrl: './code-side.component.html',
  styleUrls: ['./code-side.component.scss']
})
export class CodeSideComponent {
  constructor(private room: RoomService, readonly navigator: ChartNavigatorService) { }

  click(entry: any) {
    if (entry.node)
      this.room.sendMessage(`!moveNode ${entry.node.id}`);
  }
}
