import { Component } from '@angular/core';
import { RoomService } from 'src/app/room/room.service';
import { ChartNavigatorService } from '../chart-navigator.service';

@Component({
  selector: 'app-code-side',
  templateUrl: './code-side.component.html',
  styleUrls: ['./code-side.component.scss']
})
export class CodeSideComponent {
  constructor(readonly navigator: ChartNavigatorService) { }

  click(entry: any) {
    if (entry.node)
      this.navigator.moveNode(entry.node.id);
  }
}
