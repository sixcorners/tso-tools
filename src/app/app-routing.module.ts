import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomGuard } from './room/room.guard';
import { CodeToolComponent } from './code-tool/code-tool.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'code' },
  { path: 'code', pathMatch: 'full', canActivate: [RoomGuard], component: CodeToolComponent },
  { path: 'code/:id', component: CodeToolComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
