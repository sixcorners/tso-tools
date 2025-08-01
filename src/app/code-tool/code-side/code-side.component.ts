import { Component } from '@angular/core';
import { ChartNavigatorService } from '../chart-navigator.service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-code-side',
  imports: [
    MatToolbarModule,
    MatListModule
],
  templateUrl: './code-side.component.html',
  styleUrl: './code-side.component.scss'
})
export class CodeSideComponent {
  constructor(readonly navigator: ChartNavigatorService) { }

  click(entry: any) {
    if (entry.node)
      this.navigator.moveNode(entry.node.id);
  }
}
