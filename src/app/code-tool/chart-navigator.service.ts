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
            [2, 31, null, 3, 'AAA'],
            [2, 32, 31, 0, 'BBB'],
            [2, 33, 32, 0, 'CCC'],
            [2, 34, 32, 1, 'BCC'],
            [2, 35, 34, 1, 'CBC'],
            [2, 36, 35, 1, 'CCB'],
            [2, 37, 32, 2, 'BBC'],
            [2, 38, 37, 1, 'BCB'],
            [2, 39, 38, 1, 'CBB'],
            [2, 40, 31, 1, 'BBB'],
            [2, 41, 40, 0, 'ACC'],
            [2, 42, 41, 1, 'CAC'],
            [2, 43, 42, 1, 'CCA'],
            [2, 44, 40, 1, 'ABC'],
            [2, 45, 44, 0, 'BCA'],
            [2, 46, 45, 0, 'CAB'],
            [2, 47, 44, 1, 'ACB'],
            [2, 48, 47, 0, 'CBA'],
            [2, 49, 48, 0, 'BAC'],
            [2, 50, 40, 2, 'ABB'],
            [2, 51, 50, 1, 'BAB'],
            [2, 52, 51, 1, 'BBA'],
            [2, 53, 31, 2, 'AAB'],
            [2, 54, 53, 1, 'ABA'],
            [2, 55, 54, 1, 'BAA'],
            [2, 56, 55, 2, 'CAA'],
            [2, 57, 54, 2, 'ACA'],
            [2, 58, 53, 2, 'AAC'],
            [3, 59, null, 3, 'AAA'],
            [3, 60, 59, 0, 'BBB'],
            [3, 61, 60, 0, 'CCC'],
            [3, 62, 60, 1, 'ABC'],
            [3, 63, 62, 0, 'CCB'],
            [3, 64, 62, 1, 'BCC'],
            [3, 65, 62, 2, 'CBC'],
            [3, 66, 60, 2, 'ABC'],
            [3, 67, 66, 0, 'BCB'],
            [3, 68, 66, 1, 'CBB'],
            [3, 69, 66, 2, 'BBC'],
            [3, 70, 59, 1, 'ABB'],
            [3, 71, 70, 0, 'BAC'],
            [3, 72, 71, 0, 'CCA'],
            [3, 73, 71, 1, 'BCA'],
            [3, 74, 71, 2, 'CAC'],
            [3, 75, 70, 1, 'BAB'],
            [3, 76, 75, 0, 'ACC'],
            [3, 77, 76, 0, 'CBA'],
            [3, 78, 75, 1, 'BBA'],
            [3, 79, 75, 2, 'CAB'],
            [3, 80, 70, 2, 'ABC'],
            [3, 81, 81, 1, 'ACB'],
            [3, 82, 59, 2, 'ABB'],
            [3, 83, 82, 0, 'BAA'],
            [3, 84, 83, 2, 'CAA'],
            [3, 85, 82, 1, 'AAC'],
            [3, 86, 85, 1, 'ACA'],
            [3, 87, 82, 2, 'AAB'],
            [3, 88, 87, 1, 'ABA'],
            [4, 89, null, 3, 'AAA'],
            [4, 90, 89, 0, 'BBB'],
            [4, 91, 90, 0, 'CCC'],
            [4, 92, 90, 1, 'BCC'],
            [4, 93, 92, 1, 'CBC'],
            [4, 94, 93, 1, 'CCB'],
            [4, 95, 90, 2, 'BBC'],
            [4, 96, 95, 1, 'BCB'],
            [4, 97, 96, 1, 'CBB'],
            [4, 98, 89, 1, 'ABB'],
            [4, 99, 98, 0, 'BAC'],
            [4, 100, 99, 0, 'CCA'],
            [4, 101, 99, 1, 'BCA'],
            [4, 102, 99, 2, 'CAC'],
            [4, 103, 98, 1, 'CBA'],
            [4, 104, 103, 0, 'ACC'],
            [4, 105, 104, 0, 'BAB'],
            [4, 106, 103, 1, 'CAB'],
            [4, 107, 103, 2, 'BBA'],
            [4, 108, 98, 2, 'ABC'],
            [4, 109, 108, 1, 'ACB'],
            [4, 110, 89, 2, 'AAB'],
            [4, 111, 110, 1, 'ABA'],
            [4, 112, 111, 1, 'BAA'],
            [4, 113, 112, 2, 'CAA'],
            [4, 114, 111, 2, 'ACA'],
            [4, 115, 110, 2, 'AAC'],
            [5, 116, null, 3, 'AAA'],
            [5, 117, 116, 2, 'AAB'],
            [5, 118, 117, 2, 'AAC'],
            [5, 119, 117, 1, 'ABA'],
            [5, 120, 119, 2, 'ACA'],
            [5, 121, 119, 1, 'BAA'],
            [5, 122, 121, 2, 'CAA'],
            [5, 123, 116, 1, 'ABB'],
            [5, 124, 123, 2, 'ABC'],
            [5, 125, 124, 1, 'ACB'],
            [5, 126, 123, 1, 'CBA'],
            [5, 127, 126, 2, 'BBA'],
            [5, 128, 126, 1, 'CAB'],
            [5, 129, 126, 0, 'ACC'],
            [5, 130, 129, 0, 'BAB'],
            [5, 131, 123, 0, 'BAC'],
            [5, 132, 131, 2, 'CAC'],
            [5, 133, 131, 1, 'BCA'],
            [5, 134, 131, 0, 'CCA'],
            [5, 135, 116, 0, 'BBB'],
            [5, 136, 135, 2, 'BBC'],
            [5, 137, 136, 1, 'CBB'],
            [5, 138, 137, 1, 'BCB'],
            [5, 139, 135, 1, 'CCB'],
            [5, 140, 139, 1, 'BCC'],
            [5, 141, 140, 1, 'CBC'],
            [5, 142, 135, 0, 'CCC']
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
