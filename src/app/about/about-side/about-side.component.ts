import { Component } from '@angular/core';
import { AboutService } from '../about.service';
import { NgFor } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-about-side',
  imports: [
    NgFor,
    MatToolbarModule,
    MatListModule,
  ],
  templateUrl: './about-side.component.html',
  styleUrl: './about-side.component.scss'
})
export class AboutSideComponent {
  constructor(readonly about: AboutService) { }

  click(entry: any) {
    console.log(entry);
  }
}
