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
  private backfill?: ReturnType<typeof setTimeout>;
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
        const match = data.message.match(/!moveNode (\d+)/);
        if (match) {
          if (this.backfill) {
            clearTimeout(this.backfill);
            this.backfill = undefined;
          }
          await this.moveNodeInternal(+match[1]);
          data.node = this.current.node;
          data.parsed = `Moved to ${data.node.combination}`;
        }
      }
      {
        const match = data.message.match(/!joined/);
        if (match) {
          data.parsed = `${data.clientId} joined`;
          if (this.current.node.id)
            this.backfill = setTimeout(() => this.moveNode(this.current.node.id), Math.random() * 1000);
        }
      }
      this.history.push(data);
      if (this.history.length >= 120)
        this.history.shift();
    });

    this.db.then(async db => {
      const charts = [chart1, chart2, chart3, chart4, chart5, chart6];
      // load charts
      const chart = db.getSchema().table('chart');
      await db
        .insert()
        .into(chart)
        .values(charts.map(({ name, title }, id) => chart.createRow({ id, name, title })))
        .exec();

      // load nodes
      const node = db.getSchema().table('node');
      await db
        .insert()
        .into(node)
        .values(charts.flatMap(({ nodes }, chart_id) => nodes.map(([parent_id, matches, combination], relative_id) => node.createRow({
          chart_id,
          id: relative_id + chart_id * 100,
          relative_id,
          parent_id: parent_id === null ? null : parent_id + chart_id * 100,
          matches,
          combination,
        }))))
        .exec();

      // initialize history table to point to the first node in the first chart
      const { chart_id, id } = (await db.select()
        .from(node)
        .orderBy(node['id'])
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
      .innerJoin(node, node['chart_id'].eq(chart['id']))
      .where(node['relative_id'].eq(0))
      .orderBy(chart['id']);
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
          node['parent_id'].eq(history['node_id']),
          lf.op.and(node['parent_id'].isNull(), node['chart_id'].eq(history['chart_id']))
        )
      )
      .orderBy(history['id'], lf.Order.DESC)
      .limit(4);
    db.observe(query, (changes: any[]) => {
      this.currentChoices.fill(undefined);
      const results = changes[changes.length - 1].object;
      const last_history_id = results[0].history.id;
      for (const result of results) {
        if (result.history.id != last_history_id) break;
        this.currentChoices[result.node.matches] = result.node;
      }
    });
  });

  current?: any;
  private currentQuery = this.db.then(db => {
    const history = db.getSchema().table('history');
    const chart = db.getSchema().table('chart');
    const node = db.getSchema().table('node');
    const nodeChart = chart.as('nodeChart');
    const query = db
      .select()
      .from(history)
      .innerJoin(chart, chart['id'].eq(history['chart_id']))
      .innerJoin(node, node['id'].eq(history['node_id']))
      .innerJoin(nodeChart, nodeChart['id'].eq(node['chart_id']))
      .orderBy(history['id'], lf.Order.DESC)
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
      .where(history['id'].gt(1))
      .exec();
  }

  moveNode(id: number) {
    this.room.sendMessage(`!moveNode ${id}`);
  }

  async moveNodeRelative(relative_id: number) {
    const db = await this.db;
    const node = db.getSchema().table('node');
    const { id } = (await db.select()
      .from(node)
      .where(lf.op.and(
        node['chart_id'].eq(this.current.chart.id),
        node['relative_id'].eq(relative_id)))
      .exec())[0] as any;
    return this.moveNode(id);
  }
}
