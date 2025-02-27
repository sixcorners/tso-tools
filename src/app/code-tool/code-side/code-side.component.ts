import { Component } from '@angular/core';
import { ChartNavigatorService } from '../chart-navigator.service';
import { NgFor } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-code-side',
  imports: [
    NgFor,
    MatToolbarModule,
    MatListModule,
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
