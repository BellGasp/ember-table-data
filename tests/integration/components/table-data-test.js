import { module } from 'qunit';
import { setupRenderingTest, test, skip } from 'ember-qunit';
import { click, render, pauseTest } from '@ember/test-helpers';
import { selectChoose, clickTrigger } from 'ember-power-select/test-support/helpers';
import hbs from 'htmlbars-inline-precompile';

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
        notifyCurrentPageObservers=updateCurrentPage
        as |table-data|
      }}
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

    await pauseTest();

    await clickTrigger();
    await selectChoose('50');

    assert.equal(this.get('pageSize'), 15);
  });

  test('it notifies observers of filters changes', function(assert) {

  });

  test('it notifies observers of sorts changes', function(assert) {

  });
});
