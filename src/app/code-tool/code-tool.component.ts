import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import * as lf from 'lovefield-ts/dist/es6/lf';
import { ChartNavigatorService } from './chart-navigator.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CbuchartComponent } from './charts/cbuchart/cbuchart.component';
import { CbuthraxisoptComponent } from './charts/cbuthraxisopt/cbuthraxisopt.component';
import { ChartComponent } from './charts/chart/chart.component';
import { JnwComponent } from './charts/jnw/jnw.component';
import { TwiddlerMimCode2Component } from './charts/twiddler-mim-code2/twiddler-mim-code2.component';
import { Tso0112Component } from './charts/tso0112/tso0112.component';

// https://github.com/riperiperi/FreeSO/blob/master/TSOClient/tso.simantics/NetPlay/EODs/Handlers/VMEODPaperChasePlugin.cs
@Component({
  selector: 'app-code-tool',
  templateUrl: './code-tool.component.html',
  styleUrl: './code-tool.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    CbuchartComponent,
    CbuthraxisoptComponent,
    ChartComponent,
    JnwComponent,
    TwiddlerMimCode2Component,
    Tso0112Component,
  ]
})
export class CodeToolComponent {
  private combinations = [
    'AAA',
    'AAB',
    'AAC',
    'ABA',
    'ABB',
    'ABC',
    'ACA',
    'ACB',
    'ACC',
    'BAA',
    'BAB',
    'BAC',
    'BBA',
    'BBB',
    'BBC',
    'BCA',
    'BCB',
    'BCC',
    'CAA',
    'CAB',
    'CAC',
    'CBA',
    'CBB',
    'CBC',
    'CCA',
    'CCB',
    'CCC',
  ] as const;
  @ViewChild('chart') chart!: ElementRef<HTMLDivElement>;

  constructor(readonly navigator: ChartNavigatorService) { }

  private _currentChartInfo = '';
  private lastChartId = -1;
  get currentChartInfo() {
    if (this.lastChartId != this.navigator.current.chart.id)
      this.calculateChartInfo();
    this.lastChartId = this.navigator.current.chart.id;
    return this._currentChartInfo;
  }

  private matches(a: string, b: string) {
    let matches = 0;
    for (let i = a.length - 1; i >= 0; i--)
      matches += +(a[i] == b[i]);
    return matches;
  }

  private async calculateSteps(combination: string): Promise<[string, number]> {
    const db = await this.navigator.db;
    const node = db.getSchema().table('node');
    const history = db.getSchema().table('history');
    let [current] = await db.select()
      .from(node)
      .innerJoin(history, history.col('chart_id').eq(node.col('chart_id')))
      .where(node.col('parent_id').isNull())
      .orderBy(history.col('id'), lf.Order.DESC)
      .limit(1)
      .exec() as any[];
    let steps = 0;
    for (; ;) {
      const matches = this.matches(combination, current.node.combination);
      if (++steps >= 99 || matches == 3)
        break;
      [current] = await db.select()
        .from(node)
        .innerJoin(history, history.col('chart_id').eq(node.col('chart_id')))
        .where(lf.op.and(
          node.col('parent_id').eq(current.node.id),
          node.col('matches').eq(matches)))
        .orderBy(history.col('id'), lf.Order.DESC)
        .limit(1)
        .exec() as any[];
    }
    return [combination, steps];
  }

  private async calculateChartInfo() {
    const combinations = await Promise.all(this.combinations.map(c => this.calculateSteps(c)));
    const db = await this.navigator.db;
    const node = db.getSchema().table('node');
    const history = db.getSchema().table('history');
    const [count] = await db.select(lf.fn.count())
      .from(node)
      .innerJoin(history, history.col('chart_id').eq(node.col('chart_id')))
      .groupBy(history.col('id'))
      .orderBy(history.col('id'), lf.Order.DESC)
      .limit(1)
      .exec() as any[];
    this._currentChartInfo = `
${this.navigator.current.chart.title}
This chart has ${count["#UnknownTable"]["COUNT(*)"]} nodes.
This chart averages ${(combinations.map(c => c[1]).reduce((a, b) => a + b) / combinations.length).toFixed(3)} guesses per match.

${combinations.map(c => `${c[0]} takes ${c[1]} guess${c[1] == 1 ? '' : 'es'}`).join('\n')}
`;
  }

  moveNode(node: any) {
    if (!node) return;
    this.navigator.moveNode(node.id);
  }

  showInfo = false;
  @HostListener('window:load')
  @HostListener('window:resize')
  showHideInfo() {
    setTimeout(() => this.showInfo = !!this.chart.nativeElement.offsetLeft, 0);
  }
}
