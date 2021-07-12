import { Injectable } from '@angular/core';
import * as lf from 'lovefield';
import { RoomService } from '../room/room.service';
import { CbuchartService } from './charts/cbuchart/cbuchart.service';
import { CbuthraxisoptService } from './charts/cbuthraxisopt/cbuthraxisopt.service';
import { ChartService } from './charts/chart/chart.service';
import { JnwService } from './charts/jnw/jnw.service';
import { Tso0112Service } from './charts/tso0112/tso0112.service';
import { TwiddlerMimCode2Service } from './charts/twiddler-mim-code2/twiddler-mim-code2.service';

@Injectable({
  providedIn: 'root'
})
export class ChartNavigatorService {
  db = (() => {
    const schema = lf.schema.create('code', 1);
    schema
      .createTable('chart')
      .addColumn('id', lf.Type.INTEGER)
      .addColumn('name', lf.Type.STRING)
      .addColumn('title', lf.Type.STRING)
      .addPrimaryKey(['id']);
    schema
      .createTable('node')
      .addColumn('chart_id', lf.Type.INTEGER)
      .addColumn('id', lf.Type.INTEGER)
      .addColumn('relative_id', lf.Type.INTEGER)
      .addColumn('parent_id', lf.Type.INTEGER)
      .addColumn('matches', lf.Type.INTEGER)
      .addColumn('combination', lf.Type.STRING)
      .addNullable(['parent_id'])
      .addPrimaryKey(['id'])
      .addForeignKey('fk_chart_id', { local: 'chart_id', ref: 'chart.id' })
      // .addForeignKey('fk_parent_id', { local: 'parent_id', ref: 'node.id' })
      .addUnique('unk_relative_id', ['relative_id', 'chart_id'])
      .addUnique('unk_matches', ['parent_id', 'matches', 'chart_id']);
    schema
      .createTable('history')
      .addColumn('id', lf.Type.INTEGER)
      .addColumn('chart_id', lf.Type.INTEGER)
      .addColumn('node_id', lf.Type.INTEGER)
      .addPrimaryKey(['id'], true)
      .addForeignKey('fk_chart_id', { local: 'chart_id', ref: 'chart.id' })
      .addForeignKey('fk_node_id', { local: 'node_id', ref: 'node.id' });
    return schema.connect({ storeType: lf.schema.DataStoreType.MEMORY });
  })();
  private lastTimestamp = -Number.MAX_VALUE;
  private lastRoomName?: string;
  readonly history: any[] = [];

  constructor(private room: RoomService, chart1: CbuchartService, chart2: CbuthraxisoptService, chart3: ChartService, chart4: JnwService, chart5: TwiddlerMimCode2Service, chart6: Tso0112Service) {
    room.addEventListener('message', async ({ data }) => {
      if (this.lastRoomName != room.name) {
        this.lastRoomName = room.name;
        this.lastTimestamp = -Number.MAX_VALUE;
        this.history.length = 0;
        this.reset();
      }
      data = JSON.parse(data);
      if (this.lastTimestamp >= data.timestamp)
        return;
      if (!data.message)
        return;
      this.lastTimestamp = data.timestamp;
      {
        let match = data.message.match(/!moveNode (\d+)/);
        if (match) {
          await this.moveNodeInternal(+match[1]);
          data.node = this.current.node;
          data.parsed = `Moved to ${data.node.combination}`;
        }
      }
      this.history.push(data);
      if (this.history.length >= 120)
        this.history.shift();
    });

    this.db.then(async db => {
      const charts = [chart1, chart2, chart3, chart4, chart5, chart6];
      const chart = db.getSchema().table('chart');
      await db
        .insert()
        .into(chart)
        .values(charts.map(({ name, title }, id) => chart.createRow({ id, name, title })))
        .exec();

      const node = db.getSchema().table('node');
      const createRowForChart = (chartId: number) => (r: any[], i: number) =>
        node.createRow({
          chart_id: chartId,
          id: i + chartId * 100,
          relative_id: i,
          parent_id: r[0] === null ? null : r[0] + chartId * 100,
          matches: r[1],
          combination: r[2]
        });
      await db
        .insert()
        .into(node)
        .values([
          [null, 3, 'AAA'], // 0
          [0, 0, 'BBB'], // 1
          [1, 0, 'CCC'], // 2
          [1, 1, 'ABC'], // 3
          [3, 0, 'CCB'], // 4
          [3, 1, 'BCC'], // 5
          [3, 2, 'CBC'], // 6
          [1, 2, 'ABC'], // 7
          [7, 0, 'BCB'], // 8
          [7, 1, 'CBB'], // 9
          [7, 2, 'BBC'], // 10
          [0, 1, 'ABC'], // 11
          [11, 0, 'BAB'], // 12
          [12, 0, 'CCA'], // 13
          [12, 1, 'BCA'], // 14
          [12, 2, 'CAB'], // 15
          [11, 1, 'BBA'], // 16
          [16, 0, 'ACB'], // 17
          [17, 0, 'CAC'], // 18
          [16, 1, 'BAC'], // 19
          [16, 2, 'CBA'], // 20
          [11, 2, 'ABB'], // 21
          [21, 1, 'ACC'], // 22
          [0, 2, 'ABC'], // 23
          [23, 0, 'BAA'], // 24
          [24, 2, 'CAA'], // 25
          [23, 1, 'AAB'], // 26
          [26, 1, 'ACA'], // 27
          [23, 2, 'ABA'], // 28
          [28, 1, 'AAC'], // 29
        ].map(createRowForChart(0)))
        .exec();
      await db
        .insert()
        .into(node)
        .values([
          [null, 3, 'AAA'], // 0
          [0, 0, 'BBB'], // 1
          [1, 0, 'CCC'], // 2
          [1, 1, 'BCC'], // 3
          [3, 1, 'CBC'], // 4
          [4, 1, 'CCB'], // 5
          [1, 2, 'BBC'], // 6
          [6, 1, 'BCB'], // 7
          [7, 1, 'CBB'], // 8
          [0, 1, 'BBB'], // 9
          [9, 0, 'ACC'], // 10
          [10, 1, 'CAC'], // 11
          [11, 1, 'CCA'], // 12
          [9, 1, 'ABC'], // 13
          [13, 0, 'BCA'], // 14
          [14, 0, 'CAB'], // 15
          [13, 1, 'ACB'], // 16
          [16, 0, 'CBA'], // 17
          [17, 0, 'BAC'], // 18
          [9, 2, 'ABB'], // 19
          [19, 1, 'BAB'], // 20
          [20, 1, 'BBA'], // 21
          [0, 2, 'AAB'], // 22
          [22, 1, 'ABA'], // 23
          [23, 1, 'BAA'], // 24
          [24, 2, 'CAA'], // 25
          [23, 2, 'ACA'], // 26
          [22, 2, 'AAC'], // 27
        ].map(createRowForChart(1)))
        .exec();
      await db
        .insert()
        .into(node)
        .values([
          [null, 3, 'AAA'], // 0
          [0, 0, 'BBB'], // 1
          [1, 0, 'CCC'], // 2
          [1, 1, 'ABC'], // 3
          [3, 0, 'CCB'], // 4
          [3, 1, 'BCC'], // 5
          [3, 2, 'CBC'], // 6
          [1, 2, 'ABC'], // 7
          [7, 0, 'BCB'], // 8
          [7, 1, 'CBB'], // 9
          [7, 2, 'BBC'], // 10
          [0, 1, 'ABB'], // 11
          [11, 0, 'BAC'], // 12
          [12, 0, 'CCA'], // 13
          [12, 1, 'BCA'], // 14
          [12, 2, 'CAC'], // 15
          [11, 1, 'BAB'], // 16
          [16, 0, 'ACC'], // 17
          [17, 0, 'CBA'], // 18
          [16, 1, 'BBA'], // 19
          [16, 2, 'CAB'], // 20
          [11, 2, 'ABC'], // 21
          [21, 1, 'ACB'], // 22
          [0, 2, 'ABB'], // 23
          [23, 0, 'BAA'], // 24
          [24, 2, 'CAA'], // 25
          [23, 1, 'AAC'], // 26
          [26, 1, 'ACA'], // 27
          [23, 2, 'AAB'], // 28
          [28, 1, 'ABA'], // 29
        ].map(createRowForChart(2)))
        .exec();
      await db
        .insert()
        .into(node)
        .values([
          [null, 3, 'AAA'], // 0
          [0, 0, 'BBB'], // 1
          [1, 0, 'CCC'], // 2
          [1, 1, 'BCC'], // 3
          [3, 1, 'CBC'], // 4
          [4, 1, 'CCB'], // 5
          [1, 2, 'BBC'], // 6
          [6, 1, 'BCB'], // 7
          [7, 1, 'CBB'], // 8
          [0, 1, 'ABB'], // 9
          [9, 0, 'BAC'], // 10
          [10, 0, 'CCA'], // 11
          [10, 1, 'BCA'], // 12
          [10, 2, 'CAC'], // 13
          [9, 1, 'CBA'], // 14
          [14, 0, 'ACC'], // 15
          [15, 0, 'BAB'], // 16
          [14, 1, 'CAB'], // 17
          [14, 2, 'BBA'], // 18
          [9, 2, 'ABC'], // 19
          [19, 1, 'ACB'], // 20
          [0, 2, 'AAB'], // 21
          [21, 1, 'ABA'], // 22
          [22, 1, 'BAA'], // 23
          [23, 2, 'CAA'], // 24
          [22, 2, 'ACA'], // 25
          [21, 2, 'AAC'], // 26
        ].map(createRowForChart(3)))
        .exec();
      await db
        .insert()
        .into(node)
        .values([
          [null, 3, 'AAA'], // 0
          [0, 2, 'AAB'], // 1
          [1, 2, 'AAC'], // 2
          [1, 1, 'ABA'], // 3
          [3, 2, 'ACA'], // 4
          [3, 1, 'BAA'], // 5
          [5, 2, 'CAA'], // 6
          [0, 1, 'ABB'], // 7
          [7, 2, 'ABC'], // 8
          [8, 1, 'ACB'], // 9
          [7, 1, 'CBA'], // 10
          [10, 2, 'BBA'], // 11
          [10, 1, 'CAB'], // 12
          [10, 0, 'ACC'], // 13
          [13, 0, 'BAB'], // 14
          [7, 0, 'BAC'], // 15
          [15, 2, 'CAC'], // 16
          [15, 1, 'BCA'], // 17
          [15, 0, 'CCA'], // 18
          [0, 0, 'BBB'], // 19
          [19, 2, 'BBC'], // 20
          [20, 1, 'CBB'], // 21
          [21, 1, 'BCB'], // 22
          [19, 1, 'CCB'], // 23
          [23, 1, 'BCC'], // 24
          [24, 1, 'CBC'], // 25
          [19, 0, 'CCC'], // 26
        ].map(createRowForChart(4)))
        .exec();
      await db
        .insert()
        .into(node)
        .values([
          [null, 3, 'AAA'], // 0
          [0, 0, 'BBB'], // 1
          [1, 0, 'CCC'], // 2
          [1, 1, 'ABC'], // 3
          [3, 0, 'CCB'], // 4
          [3, 1, 'BCC'], // 5
          [3, 2, 'CBC'], // 6
          [1, 2, 'ABC'], // 7
          [7, 0, 'BCB'], // 8
          [7, 1, 'CBB'], // 9
          [7, 2, 'BBC'], // 10
          [0, 1, 'AAB'], // 11
          [11, 0, 'BBA'], // 12
          [12, 1, 'CCA'], // 13
          [12, 2, 'BCA'], // 14
          [14, 1, 'CBA'], // 15
          [11, 1, 'ABC'], // 16
          [16, 1, 'CAC'], // 17
          [17, 2, 'BAC'], // 18
          [16, 2, 'ACC'], // 19
          [11, 2, 'ABB'], // 20
          [20, 1, 'BAB'], // 21
          [21, 2, 'CAB'], // 22
          [20, 2, 'ACB'], // 23
          [0, 2, 'ABC'], // 24
          [24, 0, 'BAA'], // 25
          [25, 2, 'CAA'], // 26
          [24, 1, 'AAB'], // 27
          [27, 1, 'ACA'], // 28
          [24, 2, 'AAC'], // 29
          [29, 1, 'ABA'], // 30
        ].map(createRowForChart(5)))
        .exec();

      const { chart_id, id } = (await db.select()
        .from(node)
        .orderBy(node.id)
        .limit(1)
        .exec())[0] as any;
      const history = db.getSchema().table('history');
      await db
        .insert()
        .into(history)
        .values([history.createRow({ chart_id, node_id: id })])
        .exec();
    });
  }

  availableCharts: any[] = [];
  private availableChartsQuery = this.db.then(db => {
    const chart = db.getSchema().table('chart');
    const node = db.getSchema().table('node');
    const query = db
      .select()
      .from(chart)
      .innerJoin(node, node.chart_id.eq(chart.id))
      .where(node.relative_id.eq(0))
      .orderBy(chart.id);
    db.observe(query, (changes: any[]) => {
      this.availableCharts = changes[changes.length - 1].object;
    });
  });

  currentChoices: any[] = [];
  private currentChoicesQuery = this.db.then(db => {
    const node = db.getSchema().table('node');
    const history = db.getSchema().table('history');
    const query = db
      .select()
      .from(node)
      .innerJoin(
        history,
        lf.op.or(
          node.parent_id.eq(history.node_id),
          lf.op.and(node.parent_id.isNull(), node.chart_id.eq(history.chart_id))
        )
      )
      .orderBy(history.id, lf.Order.DESC)
      .limit(4);
    db.observe(query, (changes: any[]) => {
      this.currentChoices = [undefined, undefined, undefined, undefined];
      let results = changes[changes.length - 1].object;
      let last_history_id = results[0].history.id;
      for (let result of results) {
        if (result.history.id != last_history_id) break;
        this.currentChoices[result.node.matches] = result.node;
      }
    });
  });

  current: any = {};
  private currentQuery = this.db.then(db => {
    const history = db.getSchema().table('history');
    const chart = db.getSchema().table('chart');
    const node = db.getSchema().table('node');
    const nodeChart = chart.as('nodeChart');
    const query = db
      .select()
      .from(history)
      .innerJoin(chart, chart.id.eq(history.chart_id))
      .innerJoin(node, node.id.eq(history.node_id))
      .innerJoin(nodeChart, nodeChart.id.eq(node.chart_id))
      .orderBy(history.id, lf.Order.DESC)
      .limit(1);
    db.observe(query, (changes: any[]) => {
      this.current = changes[changes.length - 1].object[0];
    });
  });

  async moveChart(id: number) {
    const db = await this.db;
    const history = db.getSchema().table('history');
    const row = { chart_id: id, node_id: this.current.node.id };
    // swap current node if we are still on AAA
    if (!this.current.node.relative_id) {
      row.node_id = this.availableCharts[id].node.id;
    }
    return db.insert()
      .into(history)
      .values([history.createRow(row)])
      .exec();
  }

  private async moveNodeInternal(id: number) {
    const db = await this.db;
    const history = db.getSchema().table('history');
    const row = {
      chart_id: this.current.chart.id,
      node_id: id
    };
    return db.insert()
      .into(history)
      .values([history.createRow(row)])
      .exec();
  }

  async reset() {
    const db = await this.db;
    const history = db.getSchema().table('history');
    return db.delete()
      .from(history)
      .where(history.id.gt(1))
      .exec();
  }

  async moveNode(id: number) {
    this.room.sendMessage(`!moveNode ${id}`);
  }

  async moveNodeRelative(relative_id: number) {
    const db = await this.db;
    const node = db.getSchema().table('node');
    const { id } = (await db.select()
      .from(node)
      .where(lf.op.and(
        node.chart_id.eq(this.current.chart.id),
        node.relative_id.eq(relative_id)))
      .exec())[0] as any;
    return this.moveNode(id);
  }
}
