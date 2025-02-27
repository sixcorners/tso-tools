import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-top',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './about-top.component.html',
  styleUrl: './about-top.component.scss'
})
export class AboutTopComponent {

}
