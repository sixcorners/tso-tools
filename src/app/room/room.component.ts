import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RoomService } from './room.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { AboutService } from '../about/about.service';
import { ChartService } from '../code-tool/charts/chart/chart.service';
import { ChartNavigatorService } from '../code-tool/chart-navigator.service';
import { PizzaModelService } from '../pizza-tool/pizza-model.service';

@Component({
  selector: 'app-room',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    AsyncPipe
  ],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(readonly room: RoomService, route: ActivatedRoute, a: AboutService, c: ChartNavigatorService, p: PizzaModelService) {
    // eager init services that listen to RoomService and pass this component's route to RoomService
    room.subscribe(route);
  }
}
