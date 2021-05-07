import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeToolComponent } from './code-tool/code-tool.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ChartNavigatorService } from './code-tool/chart-navigator.service';
import { RoomComponent } from './room/room.component';
import { PizzaToolComponent } from './pizza-tool/pizza-tool.component';
import { CodeHistoryComponent } from './code-history/code-history.component';
import { CbuchartComponent } from './code-tool/charts/cbuchart/cbuchart.component';
import { CbuthraxisoptComponent } from './code-tool/charts/cbuthraxisopt/cbuthraxisopt.component';
import { ChartComponent } from './code-tool/charts/chart/chart.component';
import { JnwComponent } from './code-tool/charts/jnw/jnw.component';
import { TwiddlerMimCode2Component } from './code-tool/charts/twiddler-mim-code2/twiddler-mim-code2.component';
import { Tso0112Component } from './code-tool/charts/tso0112/tso0112.component';

@NgModule({
  declarations: [
    AppComponent,
    CodeToolComponent,
    RoomComponent,
    PizzaToolComponent,
    CodeHistoryComponent,
    CbuchartComponent,
    CbuthraxisoptComponent,
    ChartComponent,
    JnwComponent,
    TwiddlerMimCode2Component,
    Tso0112Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [ChartNavigatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
