import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import * as lf from 'lovefield';
import { RoomService } from '../room/room.service';
import { ChartNavigatorService } from './chart-navigator.service';

@Component({
  selector: 'app-code-tool',
  templateUrl: './code-tool.component.html',
  styleUrls: ['./code-tool.component.scss']
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

  constructor(readonly navigator: ChartNavigatorService, private room: RoomService) { }

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
    let db = await this.navigator.db;
    let node = db.getSchema().table('node');
    let history = db.getSchema().table('history');
    let current = (await db.select()
      .from(node)
      .innerJoin(history, history.chart_id.eq(node.chart_id))
      .where(node.parent_id.isNull())
      .orderBy(history.id, lf.Order.DESC)
      .limit(1)
      .exec())[0] as any;
    let steps = 0;
    for (; ;) {
      let matches = this.matches(combination, current.node.combination);
      if (++steps >= 99 || matches == 3)
        break;
      current = (await db.select()
        .from(node)
        .innerJoin(history, history.chart_id.eq(node.chart_id))
        .where(lf.op.and(
          node.parent_id.eq(current.node.id),
          node.matches.eq(matches)))
        .orderBy(history.id, lf.Order.DESC)
        .limit(1)
        .exec())[0] as any;
    }
    return [combination, steps];
  }

  private async calculateChartInfo() {
    let combinations = await Promise.all(this.combinations.map(c => this.calculateSteps(c)));
    let db = await this.navigator.db;
    let node = db.getSchema().table('node');
    let history = db.getSchema().table('history');
    let count = (await db.select(lf.fn.count())
      .from(node)
      .innerJoin(history, history.chart_id.eq(node.chart_id))
      .groupBy(history.chart_id)
      .orderBy(history.id, lf.Order.DESC)
      .limit(1)
      .exec())[0] as any;
    this._currentChartInfo = `
${this.navigator.current.chart.title}
This chart has ${count["#UnknownTable"]["COUNT(*)"]} nodes.
This chart averages ${(combinations.map(c => c[1]).reduce((a, b) => a + b) / combinations.length).toFixed(3)} guesses per match.

${combinations.map(c => `${c[0]} takes ${c[1]} guess${c[1] == 1 ? '' : 'es'}`).join('\n')}
`;
  }

  moveNode(node: any) {
    if (!node) return;
    this.room.sendMessage(`!moveNode ${node.id}`);
  }

  showInfo = false;
  @HostListener('window:load')
  @HostListener('window:resize')
  showHideInfo() {
    setTimeout(() => this.showInfo = !!this.chart.nativeElement.offsetLeft, 0);
  }
}
