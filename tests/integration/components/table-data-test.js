import { module } from 'qunit';
import { setupRenderingTest, test, skip } from 'ember-qunit';
import { click, render, pauseTest, fillIn } from '@ember/test-helpers';
import { selectChoose } from 'ember-power-select/test-support/helpers';
import hbs from 'htmlbars-inline-precompile';
import Filter from 'ember-table-data/utils/filter-object';
import { A } from '@ember/array';

module('Integration | Component | table-data', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    this.set('records', []);

    await render(hbs`
      {{#table-data records=records}}
        <table>
          <tr>
            <td>
              template block text
            </td>
          </tr>
        </table>
      {{/table-data}}
    `);

    assert.equal(this.$('table').length, 1);
    assert.equal(this.$('table').text().trim(), 'template block text');
  });

  skip('it throws assertion error without records', async function(assert) {
    assert.expectAssertion(async () => {
      await render(hbs`
        {{#table-data}}
        <tr>
        <td>
        template block text
        </td>
        </tr>
        {{/table-data}}`);
      },
      /`records`/,
      'Throws assertion error if records isn\'t passed');
  });

  test('it notifies observers of current page changes', async function(assert) {
    const TOTAL_COUNT = 40;

    let records = [];

    for (let i = 1; i <= TOTAL_COUNT; ++i) {
      records.push({ id: i });
    }

    this.set('records', records);
    this.set('queryObj', {});
    this.set('totalCount', TOTAL_COUNT);
    this.set('currentPage', null);
    this.set('updateCurrentPage', (page) => { this.set('currentPage', page); });

    await render(hbs`
      {{#table-data
        records=records
        queryObj=queryObj
        totalCount=totalCount
        notifyCurrentPageObservers=updateCurrentPage
        as |table-data|
      }}
        {{table-data.pagination}}
        <table>
          <tr>
            <td>
              template block text
            </td>
          </tr>
        </table>
      {{/table-data}}
    `);

    await click('.fa.fa-angle-right');

    assert.equal(this.get('currentPage'), 2);
  });

  test('it notifies observers of page size changes', async function(assert) {
    this.set('records', []);
    this.set('queryObj', {});
    this.set('totalCount', 0);
    this.set('pageSize', null);
    this.set('updatePageSize', (pageSize) => { this.set('pageSize', pageSize); });

    await render(hbs`
      {{#table-data
        records=records
        queryObj=queryObj
        totalCount=totalCount
        notifyPageSizeObservers=updatePageSize
        as |table-data|}}
        {{table-data.pageSize}}
        <table>
          <tr>
            <td>
              template block text
            </td>
          </tr>
        </table>
      {{/table-data}}
    `);

    await selectChoose('.page-size', '.ember-power-select-option', 4);

    assert.equal(this.get('pageSize'), 50);
  });

  test('it fires `notifySortsObservers` when sorting of the data changes', async function(assert) {
    assert.expect(1);

    this.set('records', []);
    this.set('notificationListener', (sorts) => assert.ok(sorts));

    await render(hbs`
      {{#table-data
        records=records
        notifySortsObservers=notificationListener
        as |table-data|}}

        {{#table-data.table class="table-striped col-12" as |table|}}
          {{#table.thead as |thead|}}
            {{#thead.th sort="name" data-test-sort-name=true}}Name{{/thead.th}}
          {{/table.thead}}
        {{/table-data.table}}

      {{/table-data}}
    `);

    await click('th');
  });

  test('it fires `notifyFiltersObservers` when filtering of the data changes', async function(assert) {
    assert.expect(1);

    this.set('records', []);
    this.set('properties', new A([
      Filter.create({ label: 'Name', propertyType: 'string', valueForQuery: 'name' }),
      Filter.create({ label: 'Age', propertyType: 'number', valueForQuery: 'age' }),
      Filter.create({ label: 'Evil', propertyType: 'boolean', valueForQuery: 'evil' })
    ]));
    this.set('notificationListener', filters => assert.ok(filters));

    await render(hbs`
      {{#table-data
        records=records
        notifyFiltersObservers=notificationListener
        as |table-data|}}

        {{#table-data.filter properties=properties comparators=comparators as |filter actions|}}

          <div class="row mx-2 my-2">
            <div class="w-100 text-right">
              <button class="btn btn-sm btn-success" {{action actions.add}}>
                <i class="fa fa-plus" aria-hidden="true"></i>
              </button>

              <button class="btn btn-sm btn-primary" {{action actions.filter}}>
                <i class="fa fa-filter" aria-hidden="true"></i>
              </button>

              <button class="btn btn-sm btn-outline-primary" {{action actions.clear}}>
                <i class="fa fa-refresh" aria-hidden="true"></i>
              </button>
            </div>
          </div>

          {{#filter.body as |body|}}
            {{#body.row class="row pb-1" as |row|}}
              {{row.property class="col-4"}}
              {{row.comparator class="col-4"}}
              {{row.value class="col-3 text-center"}}
              {{#if (gt row.count 1)}}
                {{#row.deleteButton class="btn btn-sm btn-danger col-1"}}
                  <i class="fa fa-trash" aria-hidden="true"></i>
                {{/row.deleteButton}}
              {{/if}}
            {{/body.row}}
          {{/filter.body}}

        {{/table-data.filter}}

      {{/table-data}}
    `);

    await click('.btn-success');
    await fillIn('input', 'Champion');
    await click('.btn-primary');
  });
});
