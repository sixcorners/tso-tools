import { Injectable } from '@angular/core';
import lf from 'lovefield';

@Injectable()
export class ChartNavigatorService {
  private db = (() => {
    const schema = lf.schema.create('code', 1);
    schema
      .createTable('chart')
      .addColumn('id', lf.Type.INTEGER)
      .addColumn('name', lf.Type.STRING)
      .addColumn('image', lf.Type.STRING)
      .addPrimaryKey(['id'], true);
    schema
      .createTable('node')
      .addColumn('chart_id', lf.Type.INTEGER)
      .addColumn('id', lf.Type.INTEGER)
      .addColumn('parent_id', lf.Type.INTEGER)
      .addColumn('matches', lf.Type.INTEGER)
      .addColumn('combination', lf.Type.STRING)
      .addNullable(['parent_id'])
      .addPrimaryKey(['id'], true)
      .addForeignKey('fk_chart_id', { local: 'chart_id', ref: 'chart.id' })
      // .addForeignKey('fk_parent_id', { local: 'parent_id', ref: 'node.id' })
      .addUnique('unk_matches', ['chart_id', 'parent_id', 'matches']);
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

  constructor() {
    this.db.then(async db => {
      const chart = db.getSchema().table('chart');
      await db
        .insert()
        .into(chart)
        .values(
          [
            [1, 'Madison\'s CBU Chart', 'cbuchart.gif'],
            [2, 'Thraxis optimized by Madison', 'cbuthraxisopt.gif'],
            [3, 'The Hermione CBU Chart', 'chart.gif'],
            [4, 'Jandrea\'s NEVER WRONG Codebreaker Chart', 'jnw.jpg'],
            [5, 'Twiddler\'s CBU Code Smasher 4.0', 'twiddler_mim_code2.gif']
          ].map(r => chart.createRow({ id: r[0], name: r[1], image: r[2] }))
        )
        .exec();

      const node = db.getSchema().table('node');
      const createRowForChart = chartId => r =>
        node.createRow({
          chart_id: chartId,
          id: r[0] + chartId * 100,
          parent_id: r[1] ? r[1] + chartId * 100 : null,
          matches: r[2],
          combination: r[3]
        });
      await db
        .insert()
        .into(node)
        .values([
          [1, null, 3, 'AAA'],
          [2, 1, 0, 'BBB'],
          [3, 2, 0, 'CCC'],
          [4, 2, 1, 'ABC'],
          [5, 4, 0, 'CCB'],
          [6, 4, 1, 'BCC'],
          [7, 4, 2, 'CBC'],
          [8, 2, 2, 'ABC'],
          [9, 8, 0, 'BCB'],
          [10, 8, 1, 'CBB'],
          [11, 8, 2, 'BBC'],
          [12, 1, 1, 'ABC'],
          [13, 12, 0, 'BAB'],
          [14, 13, 0, 'CCA'],
          [15, 13, 1, 'BCA'],
          [16, 13, 2, 'CAB'],
          [17, 12, 1, 'BBA'],
          [18, 17, 0, 'ACB'],
          [19, 18, 0, 'CAC'],
          [20, 17, 1, 'BAC'],
          [21, 17, 2, 'CBA'],
          [22, 12, 2, 'ABB'],
          [23, 22, 1, 'ACC'],
          [24, 1, 2, 'ABC'],
          [25, 24, 0, 'BAA'],
          [26, 25, 2, 'CAA'],
          [27, 24, 1, 'AAB'],
          [28, 27, 1, 'ACA'],
          [29, 24, 2, 'ABA'],
          [30, 29, 1, 'AAC']
        ].map(createRowForChart(1)))
        .exec();
      await db
        .insert()
        .into(node)
        .values([
          [1, null, 3, 'AAA'],
          [2, 1, 0, 'BBB'],
          [3, 2, 0, 'CCC'],
          [4, 2, 1, 'BCC'],
          [5, 4, 1, 'CBC'],
          [6, 5, 1, 'CCB'],
          [7, 2, 2, 'BBC'],
          [8, 7, 1, 'BCB'],
          [9, 8, 1, 'CBB'],
          [10, 1, 1, 'BBB'],
          [11, 10, 0, 'ACC'],
          [12, 11, 1, 'CAC'],
          [13, 12, 1, 'CCA'],
          [14, 10, 1, 'ABC'],
          [15, 14, 0, 'BCA'],
          [16, 15, 0, 'CAB'],
          [17, 14, 1, 'ACB'],
          [18, 17, 0, 'CBA'],
          [19, 18, 0, 'BAC'],
          [20, 10, 2, 'ABB'],
          [21, 20, 1, 'BAB'],
          [22, 21, 1, 'BBA'],
          [23, 1, 2, 'AAB'],
          [24, 23, 1, 'ABA'],
          [25, 24, 1, 'BAA'],
          [26, 25, 2, 'CAA'],
          [27, 24, 2, 'ACA'],
          [28, 23, 2, 'AAC']
        ].map(createRowForChart(2)))
        .exec();
      await db
        .insert()
        .into(node)
        .values([
          [1, null, 3, 'AAA'],
          [2, 1, 0, 'BBB'],
          [3, 2, 0, 'CCC'],
          [4, 2, 1, 'ABC'],
          [5, 4, 0, 'CCB'],
          [6, 4, 1, 'BCC'],
          [7, 4, 2, 'CBC'],
          [8, 2, 2, 'ABC'],
          [9, 8, 0, 'BCB'],
          [10, 8, 1, 'CBB'],
          [11, 8, 2, 'BBC'],
          [12, 1, 1, 'ABB'],
          [13, 12, 0, 'BAC'],
          [14, 13, 0, 'CCA'],
          [15, 13, 1, 'BCA'],
          [16, 13, 2, 'CAC'],
          [17, 12, 1, 'BAB'],
          [18, 17, 0, 'ACC'],
          [19, 18, 0, 'CBA'],
          [20, 17, 1, 'BBA'],
          [21, 17, 2, 'CAB'],
          [22, 12, 2, 'ABC'],
          [23, 23, 1, 'ACB'],
          [24, 1, 2, 'ABB'],
          [25, 24, 0, 'BAA'],
          [26, 25, 2, 'CAA'],
          [27, 24, 1, 'AAC'],
          [28, 27, 1, 'ACA'],
          [29, 24, 2, 'AAB'],
          [30, 29, 1, 'ABA']
        ].map(createRowForChart(3)))
        .exec();
      await db
        .insert()
        .into(node)
        .values([
          [1, null, 3, 'AAA'],
          [2, 1, 0, 'BBB'],
          [3, 2, 0, 'CCC'],
          [4, 2, 1, 'BCC'],
          [5, 4, 1, 'CBC'],
          [6, 5, 1, 'CCB'],
          [7, 2, 2, 'BBC'],
          [8, 7, 1, 'BCB'],
          [9, 8, 1, 'CBB'],
          [10, 1, 1, 'ABB'],
          [11, 10, 0, 'BAC'],
          [12, 11, 0, 'CCA'],
          [13, 11, 1, 'BCA'],
          [14, 11, 2, 'CAC'],
          [15, 10, 1, 'CBA'],
          [16, 15, 0, 'ACC'],
          [17, 16, 0, 'BAB'],
          [18, 15, 1, 'CAB'],
          [19, 15, 2, 'BBA'],
          [20, 10, 2, 'ABC'],
          [21, 20, 1, 'ACB'],
          [22, 1, 2, 'AAB'],
          [23, 22, 1, 'ABA'],
          [24, 23, 1, 'BAA'],
          [25, 24, 2, 'CAA'],
          [26, 23, 2, 'ACA'],
          [27, 22, 2, 'AAC']
        ].map(createRowForChart(4)))
        .exec();
      await db
        .insert()
        .into(node)
        .values([
          [1, null, 3, 'AAA'],
          [2, 1, 2, 'AAB'],
          [3, 2, 2, 'AAC'],
          [4, 2, 1, 'ABA'],
          [5, 4, 2, 'ACA'],
          [6, 4, 1, 'BAA'],
          [7, 6, 2, 'CAA'],
          [8, 1, 1, 'ABB'],
          [9, 8, 2, 'ABC'],
          [10, 9, 1, 'ACB'],
          [11, 8, 1, 'CBA'],
          [12, 11, 2, 'BBA'],
          [13, 11, 1, 'CAB'],
          [14, 11, 0, 'ACC'],
          [15, 14, 0, 'BAB'],
          [16, 8, 0, 'BAC'],
          [17, 16, 2, 'CAC'],
          [18, 16, 1, 'BCA'],
          [19, 16, 0, 'CCA'],
          [20, 1, 0, 'BBB'],
          [21, 20, 2, 'BBC'],
          [22, 21, 1, 'CBB'],
          [23, 22, 1, 'BCB'],
          [24, 20, 1, 'CCB'],
          [25, 24, 1, 'BCC'],
          [26, 25, 1, 'CBC'],
          [27, 20, 0, 'CCC']
        ].map(createRowForChart(5)))
        .exec();

      const history = db.getSchema().table('history');
      await db
        .insert()
        .into(history)
        .values([history.createRow({ chart_id: 1, node_id: 101 })])
        .exec();
    });
  }

  availableCharts = [];
  private availableChartsQuery = this.db.then(db => {
    const chart = db.getSchema().table('chart');
    const node = db.getSchema().table('node');
    const query = db
      .select()
      .from(chart)
      .innerJoin(node, node.chart_id.eq(chart.id))
      .where(node.matches.eq(3));
    db.observe(query, changes => {
      this.availableCharts = changes[changes.length - 1].object;
    });
  });

  currentChart: any = {};
  private currentChartQuery = this.db.then(db => {
    const chart = db.getSchema().table('chart');
    const h1 = db
      .getSchema()
      .table('history')
      .as('h1');
    const h2 = db
      .getSchema()
      .table('history')
      .as('h2');
    const query = db
      .select()
      .from(chart)
      .innerJoin(h1, h1.chart_id.eq(chart.id))
      .leftOuterJoin(h2, h2.id.gt(h1.id))
      .where(h2.id.isNull());
    db.observe(query, changes => {
      this.currentChart = changes[changes.length - 1].object[0].chart;
    });
  });

  currentChoices = [];
  private currentChoicesQuery = this.db.then(db => {
    const node = db.getSchema().table('node');
    const h1 = db
      .getSchema()
      .table('history')
      .as('h1');
    const h2 = db
      .getSchema()
      .table('history')
      .as('h2');
    const query = db
      .select()
      .from(node)
      .innerJoin(
        h1,
        lf.op.or(
          node.parent_id.eq(h1.node_id),
          lf.op.and(node.parent_id.isNull(), node.chart_id.eq(h1.chart_id))
        )
      )
      .leftOuterJoin(h2, h2.id.gt(h1.id))
      .where(h2.id.isNull());
    db.observe(query, changes => {
      this.currentChoices = this.currentChoices.map(x => null);
      changes[changes.length - 1].object.forEach(result => {
        this.currentChoices[result.node.matches] = result.node;
      });
    });
  });

  currentNode: any = { combination: 'AAA' };
  private currentNodeQuery = this.db.then(db => {
    const node = db.getSchema().table('node');
    const h1 = db
      .getSchema()
      .table('history')
      .as('h1');
    const h2 = db
      .getSchema()
      .table('history')
      .as('h2');
    const query = db
      .select()
      .from(node)
      .innerJoin(h1, h1.node_id.eq(node.id))
      .leftOuterJoin(h2, h2.id.gt(h1.id))
      .where(h2.id.isNull());
    db.observe(query, changes => {
      this.currentNode = changes[changes.length - 1].object[0].node;
    });
  });

  history = [];
  private historyQuery = this.db.then(db => {
    const history = db.getSchema().table('history');
    const node = db.getSchema().table('node');
    const query = db
      .select()
      .from(history)
      .innerJoin(node, node.id.eq(history.node_id))
      .orderBy(history.id);
    db.observe(query, changes => {
      this.history = changes[changes.length - 1].object;
    });
  });

  async moveChart(id: number) {
    const db = await this.db;
    const history = db.getSchema().table('history');
    const row = { chart_id: id, node_id: this.currentNode.id };
    if (!this.currentNode.parent_id) {
      row.node_id = this.availableCharts[id - 1].node.id;
    }
    db.insert()
      .into(history)
      .values([history.createRow(row)])
      .exec();
  }

  async moveNode(id: number) {
    const db = await this.db;
    const history = db.getSchema().table('history');
    const row = {
      chart_id: this.history[this.history.length - 1].history.chart_id,
      node_id: id
    };
    db.insert()
      .into(history)
      .values([history.createRow(row)])
      .exec();
  }
}
