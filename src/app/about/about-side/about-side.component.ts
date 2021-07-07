import { Component, OnInit } from '@angular/core';
import { AboutService } from '../about.service';

@Component({
  selector: 'app-about-side',
  templateUrl: './about-side.component.html',
  styleUrls: ['./about-side.component.scss']
})
export class AboutSideComponent implements OnInit {
  constructor(readonly about: AboutService) { }

  ngOnInit(): void {
  }

  click(entry: any) {
    console.log(entry);
  }
}
