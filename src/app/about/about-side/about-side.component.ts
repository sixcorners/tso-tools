import { Component } from '@angular/core';
import { AboutService } from '../about.service';

@Component({
  selector: 'app-about-side',
  templateUrl: './about-side.component.html',
  styleUrls: ['./about-side.component.scss']
})
export class AboutSideComponent {
  constructor(readonly about: AboutService) { }

  click(entry: any) {
    console.log(entry);
  }
}
