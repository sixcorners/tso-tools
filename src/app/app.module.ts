import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeToolComponent } from './code-tool/code-tool.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ChartNavigatorService } from "./code-tool/chart-navigator.service";
import { RoomComponent } from './room/room.component';
import { PizzaToolComponent } from './pizza-tool/pizza-tool.component';

@NgModule({
  declarations: [
    AppComponent,
    CodeToolComponent,
    RoomComponent,
    PizzaToolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [ChartNavigatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
