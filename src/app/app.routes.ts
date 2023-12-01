import { Routes } from '@angular/router';
import { roomGuard } from './room/room.guard';
import { RoomComponent } from './room/room.component';
import { CodeToolComponent } from './code-tool/code-tool.component';
import { CodeSideComponent } from './code-tool/code-side/code-side.component';
import { CodeTopComponent } from './code-tool/code-top/code-top.component';
import { PizzaToolComponent } from './pizza-tool/pizza-tool.component';
import { PizzaSideComponent } from './pizza-tool/pizza-side/pizza-side.component';
import { PizzaTopComponent } from './pizza-tool/pizza-top/pizza-top.component';
import { AboutComponent } from './about/about.component';
import { AboutSideComponent } from './about/about-side/about-side.component';
import { AboutTopComponent } from './about/about-top/about-top.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'code' },
  { path: 'code', pathMatch: 'full', canActivate: [roomGuard], children: [] },
  { path: 'code/:room', component: RoomComponent, children: [
    { path: '', component: CodeToolComponent },
    { path: '', component: CodeSideComponent, outlet: 'side' },
    { path: '', component: CodeTopComponent, outlet: 'top' },
  ]},
  { path: 'pizza', pathMatch: 'full', canActivate: [roomGuard], children: [] },
  { path: 'pizza/:room', component: RoomComponent, children: [
    { path: '', component: PizzaToolComponent },
    { path: '', component: PizzaSideComponent, outlet: 'side' },
    { path: '', component: PizzaTopComponent, outlet: 'top' },
  ]},
  { path: 'about', pathMatch: 'full', canActivate: [roomGuard], children: [] },
  { path: 'about/:room', component: RoomComponent, children: [
    { path: '', component: AboutComponent },
    { path: '', component: AboutSideComponent, outlet: 'side' },
    { path: '', component: AboutTopComponent, outlet: 'top' },
  ]},
];
