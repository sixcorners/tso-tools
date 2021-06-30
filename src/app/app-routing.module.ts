import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomGuard } from './room/room.guard';
import { RoomComponent } from './room/room.component';
import { CodeToolComponent } from './code-tool/code-tool.component';
import { CodeSideComponent } from './code-tool/code-side/code-side.component';
import { PizzaToolComponent } from './pizza-tool/pizza-tool.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'code' },
  { path: 'code', pathMatch: 'full', canActivate: [RoomGuard], children: [] },
  { path: 'code/:room', component: RoomComponent, children: [
    { path: '', component: CodeToolComponent },
    { path: '', component: CodeSideComponent, outlet: 'side' },
  ]},
  { path: 'pizza', pathMatch: 'full', canActivate: [RoomGuard], children: [] },
  { path: 'pizza/:room', component: RoomComponent, children: [
    { path: '', component: PizzaToolComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
