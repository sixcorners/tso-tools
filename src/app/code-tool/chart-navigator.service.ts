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
            [5, 'Twiddler\'s CBU Code Smasher 4.0', 'twiddler_mim_code2.gif'],
            [6, 'tso0112\'s chart', ''],
          ].map(r => chart.createRow({ id: r[0], name: r[1], image: r[2] }))
        )
        .exec();

      const node = db.getSchema().table('node');
      const createRowForChart = chartId => (r, i) =>
        node.createRow({
          chart_id: chartId,
          id: i + 1 + chartId * 100,
          parent_id: r[0] ? r[0] + chartId * 100 : null,
          matches: r[1],
          combination: r[2]
        });
      await db
        .insert()
        .into(node)
        .values([
          [null, 3, 'AAA'], // 1
          [1, 0, 'BBB'], // 2
          [2, 0, 'CCC'], // 3
          [2, 1, 'ABC'], // 4
          [4, 0, 'CCB'], // 5
          [4, 1, 'BCC'], // 6
          [4, 2, 'CBC'], // 7
          [2, 2, 'ABC'], // 8
          [8, 0, 'BCB'], // 9
          [8, 1, 'CBB'], // 10
          [8, 2, 'BBC'], // 11
          [1, 1, 'ABC'], // 12
          [12, 0, 'BAB'], // 13
          [13, 0, 'CCA'], // 14
          [13, 1, 'BCA'], // 15
          [13, 2, 'CAB'], // 16
          [12, 1, 'BBA'], // 17
          [17, 0, 'ACB'], // 18
          [18, 0, 'CAC'], // 19
          [17, 1, 'BAC'], // 20
          [17, 2, 'CBA'], // 21
          [12, 2, 'ABB'], // 22
          [22, 1, 'ACC'], // 23
          [1, 2, 'ABC'], // 24
          [24, 0, 'BAA'], // 25
          [25, 2, 'CAA'], // 26
          [24, 1, 'AAB'], // 27
          [27, 1, 'ACA'], // 28
          [24, 2, 'ABA'], // 29
          [29, 1, 'AAC'] // 30
        ].map(createRowForChart(1)))
        .exec();
      await db
        .insert()
        .into(node)
        .values([
          [null, 3, 'AAA'], // 1
          [1, 0, 'BBB'], // 2
          [2, 0, 'CCC'], // 3
          [2, 1, 'BCC'], // 4
          [4, 1, 'CBC'], // 5
          [5, 1, 'CCB'], // 6
          [2, 2, 'BBC'], // 7
          [7, 1, 'BCB'], // 8
          [8, 1, 'CBB'], // 9
          [1, 1, 'BBB'], // 10
          [10, 0, 'ACC'], // 11
          [11, 1, 'CAC'], // 12
          [12, 1, 'CCA'], // 13
          [10, 1, 'ABC'], // 14
          [14, 0, 'BCA'], // 15
          [15, 0, 'CAB'], // 16
          [14, 1, 'ACB'], // 17
          [17, 0, 'CBA'], // 18
          [18, 0, 'BAC'], // 19
          [10, 2, 'ABB'], // 20
          [20, 1, 'BAB'], // 21
          [21, 1, 'BBA'], // 22
          [1, 2, 'AAB'], // 23
          [23, 1, 'ABA'], // 24
          [24, 1, 'BAA'], // 25
          [25, 2, 'CAA'], // 26
          [24, 2, 'ACA'], // 27
          [23, 2, 'AAC'] // 28
        ].map(createRowForChart(2)))
        .exec();
      await db
        .insert()
        .into(node)
        .values([
          [null, 3, 'AAA'], // 1
          [1, 0, 'BBB'], // 2
          [2, 0, 'CCC'], // 3
          [2, 1, 'ABC'], // 4
          [4, 0, 'CCB'], // 5
          [4, 1, 'BCC'], // 6
          [4, 2, 'CBC'], // 7
          [2, 2, 'ABC'], // 8
          [8, 0, 'BCB'], // 9
          [8, 1, 'CBB'], // 10
          [8, 2, 'BBC'], // 11
          [1, 1, 'ABB'], // 12
          [12, 0, 'BAC'], // 13
          [13, 0, 'CCA'], // 14
          [13, 1, 'BCA'], // 15
          [13, 2, 'CAC'], // 16
          [12, 1, 'BAB'], // 17
          [17, 0, 'ACC'], // 18
          [18, 0, 'CBA'], // 19
          [17, 1, 'BBA'], // 20
          [17, 2, 'CAB'], // 21
          [12, 2, 'ABC'], // 22
          [23, 1, 'ACB'], // 23
          [1, 2, 'ABB'], // 24
          [24, 0, 'BAA'], // 25
          [25, 2, 'CAA'], // 26
          [24, 1, 'AAC'], // 27
          [27, 1, 'ACA'], // 28
          [24, 2, 'AAB'], // 29
          [29, 1, 'ABA'] // 30
        ].map(createRowForChart(3)))
        .exec();
      await db
        .insert()
        .into(node)
        .values([
          [null, 3, 'AAA'], // 1
          [1, 0, 'BBB'], // 2
          [2, 0, 'CCC'], // 3
          [2, 1, 'BCC'], // 4
          [4, 1, 'CBC'], // 5
          [5, 1, 'CCB'], // 6
          [2, 2, 'BBC'], // 7
          [7, 1, 'BCB'], // 8
          [8, 1, 'CBB'], // 9
          [1, 1, 'ABB'], // 10
          [10, 0, 'BAC'], // 11
          [11, 0, 'CCA'], // 12
          [11, 1, 'BCA'], // 13
          [11, 2, 'CAC'], // 14
          [10, 1, 'CBA'], // 15
          [15, 0, 'ACC'], // 16
          [16, 0, 'BAB'], // 17
          [15, 1, 'CAB'], // 18
          [15, 2, 'BBA'], // 19
          [10, 2, 'ABC'], // 20
          [20, 1, 'ACB'], // 21
          [1, 2, 'AAB'], // 22
          [22, 1, 'ABA'], // 23
          [23, 1, 'BAA'], // 24
          [24, 2, 'CAA'], // 25
          [23, 2, 'ACA'], // 26
          [22, 2, 'AAC'] // 27
        ].map(createRowForChart(4)))
        .exec();
      await db
        .insert()
        .into(node)
        .values([
          [null, 3, 'AAA'], // 1
          [1, 2, 'AAB'], // 2
          [2, 2, 'AAC'], // 3
          [2, 1, 'ABA'], // 4
          [4, 2, 'ACA'], // 5
          [4, 1, 'BAA'], // 6
          [6, 2, 'CAA'], // 7
          [1, 1, 'ABB'], // 8
          [8, 2, 'ABC'], // 9
          [9, 1, 'ACB'], // 10
          [8, 1, 'CBA'], // 11
          [11, 2, 'BBA'], // 12
          [11, 1, 'CAB'], // 13
          [11, 0, 'ACC'], // 14
          [14, 0, 'BAB'], // 15
          [8, 0, 'BAC'], // 16
          [16, 2, 'CAC'], // 17
          [16, 1, 'BCA'], // 18
          [16, 0, 'CCA'], // 19
          [1, 0, 'BBB'], // 20
          [20, 2, 'BBC'], // 21
          [21, 1, 'CBB'], // 22
          [22, 1, 'BCB'], // 23
          [20, 1, 'CCB'], // 24
          [24, 1, 'BCC'], // 25
          [25, 1, 'CBC'], // 26
          [20, 0, 'CCC'] // 27
        ].map(createRowForChart(5)))
        .exec();
      await db
        .insert()
        .into(node)
        .values([
          [null, 3, 'AAA'], // 1
          [1, 0, 'BBB'], // 2
          [2, 0, 'CCC'], // 3
          [2, 1, 'ABC'], // 4
          [4, 0, 'CCB'], // 5
          [4, 1, 'BCC'], // 6
          [4, 2, 'CBC'], // 7
          [2, 2, 'ABC'], // 8
          [8, 0, 'BCB'], // 9
          [8, 1, 'CBB'], // 10
          [8, 2, 'BBC'], // 11
          [1, 1, 'AAB'], // 12
          [12, 0, 'BBA'], // 13
          [13, 1, 'CCA'], // 14
          [13, 2, 'BCA'], // 15
          [15, 1, 'CBA'], // 16
          [12, 1, 'ABC'], // 17
          [17, 1, 'CAC'], // 18
          [18, 2, 'BAC'], // 19
          [17, 2, 'ACC'], // 20
          [12, 2, 'ABB'], // 21
          [21, 1, 'BAB'], // 22
          [22, 2, 'CAB'], // 23
          [21, 2, 'ACB'], // 24
          [1, 2, 'ABC'], // 25
          [25, 0, 'BAA'], // 26
          [26, 2, 'CAA'], // 27
          [25, 1, 'AAB'], // 28
          [28, 1, 'ACA'], // 29
          [25, 2, 'AAC'], // 30
          [30, 1, 'ABA'] // 31
        ].map(createRowForChart(6)))
        .exec();

      const { chart_id, id } = (await db.select()
        .from(node)
        .orderBy(node.id)
        .limit(1)
        .exec())[0];
      const history = db.getSchema().table('history');
      await db
        .insert()
        .into(history)
        .values([history.createRow({ chart_id, node_id: id })])
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
