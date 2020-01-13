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
      await db
        .insert()
        .into(node)
        .values(
          [
            [1, 1, null, 3, 'AAA'],
            [1, 2, 1, 0, 'BBB'],
            [1, 3, 2, 0, 'CCC'],
            [1, 4, 2, 1, 'ABC'],
            [1, 5, 4, 0, 'CCB'],
            [1, 6, 4, 1, 'BCC'],
            [1, 7, 4, 2, 'CBC'],
            [1, 8, 2, 2, 'ABC'],
            [1, 9, 8, 0, 'BCB'],
            [1, 10, 8, 1, 'CBB'],
            [1, 11, 8, 2, 'BBC'],
            [1, 12, 1, 1, 'ABC'],
            [1, 13, 12, 0, 'BAB'],
            [1, 14, 13, 0, 'CCA'],
            [1, 15, 13, 1, 'BCA'],
            [1, 16, 13, 2, 'CAB'],
            [1, 17, 12, 1, 'BBA'],
            [1, 18, 17, 0, 'ACB'],
            [1, 19, 18, 0, 'CAC'],
            [1, 20, 17, 1, 'BAC'],
            [1, 21, 17, 2, 'CBA'],
            [1, 22, 12, 2, 'ABB'],
            [1, 23, 22, 1, 'ACC'],
            [1, 24, 1, 2, 'ABC'],
            [1, 25, 24, 0, 'BAA'],
            [1, 26, 25, 2, 'CAA'],
            [1, 27, 24, 1, 'AAB'],
            [1, 28, 27, 1, 'ACA'],
            [1, 29, 24, 2, 'ABA'],
            [1, 30, 29, 1, 'AAC'],
            [2, 101, null, 3, 'AAA'],
            [2, 102, 101, 0, 'BBB'],
            [2, 103, 102, 0, 'CCC'],
            [2, 104, 102, 1, 'BCC'],
            [2, 105, 104, 1, 'CBC'],
            [2, 106, 105, 1, 'CCB'],
            [2, 107, 102, 2, 'BBC'],
            [2, 108, 107, 1, 'BCB'],
            [2, 109, 108, 1, 'CBB'],
            [2, 110, 101, 1, 'BBB'],
            [2, 111, 110, 0, 'ACC'],
            [2, 112, 111, 1, 'CAC'],
            [2, 113, 112, 1, 'CCA'],
            [2, 114, 110, 1, 'ABC'],
            [2, 115, 114, 0, 'BCA'],
            [2, 116, 115, 0, 'CAB'],
            [2, 117, 114, 1, 'ACB'],
            [2, 118, 117, 0, 'CBA'],
            [2, 119, 118, 0, 'BAC'],
            [2, 120, 110, 2, 'ABB'],
            [2, 121, 120, 1, 'BAB'],
            [2, 122, 121, 1, 'BBA'],
            [2, 123, 101, 2, 'AAB'],
            [2, 124, 123, 1, 'ABA'],
            [2, 125, 124, 1, 'BAA'],
            [2, 126, 125, 2, 'CAA'],
            [2, 127, 124, 2, 'ACA'],
            [2, 128, 123, 2, 'AAC'],
            [3, 201, null, 3, 'AAA'],
            [3, 202, 201, 0, 'BBB'],
            [3, 203, 202, 0, 'CCC'],
            [3, 204, 202, 1, 'ABC'],
            [3, 205, 204, 0, 'CCB'],
            [3, 206, 204, 1, 'BCC'],
            [3, 207, 204, 2, 'CBC'],
            [3, 208, 202, 2, 'ABC'],
            [3, 209, 208, 0, 'BCB'],
            [3, 210, 208, 1, 'CBB'],
            [3, 211, 208, 2, 'BBC'],
            [3, 212, 201, 1, 'ABB'],
            [3, 213, 212, 0, 'BAC'],
            [3, 214, 213, 0, 'CCA'],
            [3, 215, 213, 1, 'BCA'],
            [3, 216, 213, 2, 'CAC'],
            [3, 217, 212, 1, 'BAB'],
            [3, 218, 217, 0, 'ACC'],
            [3, 219, 218, 0, 'CBA'],
            [3, 220, 217, 1, 'BBA'],
            [3, 221, 217, 2, 'CAB'],
            [3, 222, 212, 2, 'ABC'],
            [3, 223, 223, 1, 'ACB'],
            [3, 224, 201, 2, 'ABB'],
            [3, 225, 224, 0, 'BAA'],
            [3, 226, 225, 2, 'CAA'],
            [3, 227, 224, 1, 'AAC'],
            [3, 228, 227, 1, 'ACA'],
            [3, 229, 224, 2, 'AAB'],
            [3, 230, 229, 1, 'ABA'],
            [4, 301, null, 3, 'AAA'],
            [4, 302, 301, 0, 'BBB'],
            [4, 303, 302, 0, 'CCC'],
            [4, 304, 302, 1, 'BCC'],
            [4, 305, 304, 1, 'CBC'],
            [4, 306, 305, 1, 'CCB'],
            [4, 307, 302, 2, 'BBC'],
            [4, 308, 307, 1, 'BCB'],
            [4, 309, 308, 1, 'CBB'],
            [4, 310, 301, 1, 'ABB'],
            [4, 311, 310, 0, 'BAC'],
            [4, 312, 311, 0, 'CCA'],
            [4, 313, 311, 1, 'BCA'],
            [4, 314, 311, 2, 'CAC'],
            [4, 315, 310, 1, 'CBA'],
            [4, 316, 315, 0, 'ACC'],
            [4, 317, 316, 0, 'BAB'],
            [4, 318, 315, 1, 'CAB'],
            [4, 319, 315, 2, 'BBA'],
            [4, 320, 310, 2, 'ABC'],
            [4, 321, 320, 1, 'ACB'],
            [4, 322, 301, 2, 'AAB'],
            [4, 323, 322, 1, 'ABA'],
            [4, 324, 323, 1, 'BAA'],
            [4, 325, 324, 2, 'CAA'],
            [4, 326, 323, 2, 'ACA'],
            [4, 327, 322, 2, 'AAC'],
            [5, 401, null, 3, 'AAA'],
            [5, 402, 401, 2, 'AAB'],
            [5, 403, 402, 2, 'AAC'],
            [5, 404, 402, 1, 'ABA'],
            [5, 405, 404, 2, 'ACA'],
            [5, 406, 404, 1, 'BAA'],
            [5, 407, 406, 2, 'CAA'],
            [5, 408, 401, 1, 'ABB'],
            [5, 409, 408, 2, 'ABC'],
            [5, 410, 409, 1, 'ACB'],
            [5, 411, 408, 1, 'CBA'],
            [5, 412, 411, 2, 'BBA'],
            [5, 413, 411, 1, 'CAB'],
            [5, 414, 411, 0, 'ACC'],
            [5, 415, 414, 0, 'BAB'],
            [5, 416, 408, 0, 'BAC'],
            [5, 417, 416, 2, 'CAC'],
            [5, 418, 416, 1, 'BCA'],
            [5, 419, 416, 0, 'CCA'],
            [5, 420, 401, 0, 'BBB'],
            [5, 421, 420, 2, 'BBC'],
            [5, 422, 421, 1, 'CBB'],
            [5, 423, 422, 1, 'BCB'],
            [5, 424, 420, 1, 'CCB'],
            [5, 425, 424, 1, 'BCC'],
            [5, 426, 425, 1, 'CBC'],
            [5, 427, 420, 0, 'CCC'],
          ].map(r =>
            node.createRow({
              chart_id: r[0],
              id: r[1],
              parent_id: r[2],
              matches: r[3],
              combination: r[4]
            })
          )
        )
        .exec();

      const history = db.getSchema().table('history');
      await db
        .insert()
        .into(history)
        .values([history.createRow({ chart_id: 1, node_id: 1 })])
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
      .where(h2.id.isNull())
      .orderBy(node.matches);
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

  moveChart(id: number) {
    this.db.then(db => {
      const history = db.getSchema().table('history');
      const row = { chart_id: id, node_id: this.currentNode.id };
      if (!this.currentNode.parent_id) {
        row.node_id = this.availableCharts[id - 1].node.id;
      }
      db.insert()
        .into(history)
        .values([history.createRow(row)])
        .exec();
    });
  }

  moveNode(id: number) {
    this.db.then(db => {
      const history = db.getSchema().table('history');
      const row = {
        chart_id: this.history[this.history.length - 1].history.chart_id,
        node_id: id
      };
      db.insert()
        .into(history)
        .values([history.createRow(row)])
        .exec();
    });
  }
}
