import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { A } from '@ember/array';
import filterObject from 'ember-table-data/utils/filter-object';

module('Integration | Component | core/table filter', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders nothing without error when you don\'t use the inner component', async function(assert) {

    await render(hbs`{{core/table-filter}}`);
    assert.equal(this.element.querySelector('*').textContent.trim(), '', 'This component is block component using exposed component');
  });

  test('it renders header when you use the inner component', async function(assert) {

    await render(hbs`
      {{#core/table-filter as |filter|}}
        {{filter.header class="testHeaderClass"}}
      {{/core/table-filter}}
      `);
    assert.equal(this.element.querySelectorAll('.testHeaderClass').length, 1, 'The yeld for header is generating correctly');
  });

  test('it renders body when you use the inner component', async function(assert) {

    await render(hbs`
      {{#core/table-filter as |filter|}}
        {{filter.body class="testHeaderClass"}}
      {{/core/table-filter}}
      `);
    assert.equal(this.element.querySelectorAll('.testHeaderClass').length, 1, 'The yeld for body is generating correctly');
  });

  test('it renders footer when you use the inner component', async function(assert) {

    await render(hbs`
      {{#core/table-filter as |filter|}}
        {{filter.footer class="testHeaderClass"}}
      {{/core/table-filter}}
      `);
    assert.equal(this.element.querySelectorAll('.testHeaderClass').length, 1, 'The yeld for footer is generating correctly');
  });

  test('it execute addRow action correctly when action is executed', async function(assert) {
    assert.expect(2);
    this.set('rows', A());
    assert.equal(this.get('rows.length'), 0);
    await render(hbs`
      {{#core/table-filter rows=rows as |filter|}}
        {{#filter.header as |header|}}
          {{header.addButton }}
        {{/filter.header}}
      {{/core/table-filter}}
      `);
    await click('button');
    assert.equal(this.get('rows.length'), 1);
  });

  test('it execute addRow and then remove it correctly when action is executed', async function(assert) {
    assert.expect(3);
    this.set('rows', A());
    assert.equal(this.get('rows.length'), 0);
    await render(hbs`
      {{#core/table-filter rows=rows as |filter|}}
        {{#filter.header class="header" as |header|}}
          {{header.addButton }}
        {{/filter.header}}

        {{#filter.body as |body|}}

        {{#body.row as |row|}}
          {{row.property }}
          {{row.comparator }}
          {{row.value }}
          {{row.deleteButton class="delete"}}
        {{/body.row}}
      {{/filter.body}}

      {{/core/table-filter}}
      `);
    await click('.header > button');
    await click('.header > button');
    assert.equal(this.get('rows.length'), 2);

    await click(this.element.querySelector('button.delete'));
    assert.equal(this.get('rows.length'), 1);
  });

  test('it execute updateFilter action correctly when action is executed', async function(assert) {
    assert.expect(1);
    this.set('rows', A());
    this.set('externalAction', () => {
      assert.ok(true);
    });

    await render(hbs`
      {{#core/table-filter rows=rows updateFilter=(action externalAction) as |filter|}}
        {{#filter.header class="header" as |header|}}
          {{header.addButton }}
        {{/filter.header}}

        {{#filter.footer as |footer| }}
          {{footer.filterButton class="filter"}}
        {{/filter.footer}}
      {{/core/table-filter}}
      `);

    await click('.header > button');
    await click('button.filter');
  });

  test('it execute updateFilter action correctly when action is executed and clear filter', async function(assert) {
    assert.expect(2);
    this.set('rows', A());
    this.set('externalAction', () => {
      assert.ok(true);
    });

    await render(hbs`
      {{#core/table-filter _rows=rows updateFilter=(action externalAction) as |filter|}}
        {{#filter.header class="header" as |header|}}
          {{header.addButton }}
        {{/filter.header}}

        {{#filter.footer as |footer| }}
          {{footer.clearButton class="clear"}}
        {{/filter.footer}}
      {{/core/table-filter}}
      `);

    await click('.header > button');
    await click('.header > button');
    await click('.header > button');
    await click('.header > button');
    await click('.header > button');


    await click('button.clear');

    assert.equal(this.get('rows.length'), 0);
  });

  test('it can filter data with boolean comparator -- true', async function(assert) {
    assert.expect(2);

    this.set('properties', A([
      filterObject.create({ label:'MH #', propertyType:'boolean',
        valueForQuery:'PA' })
    ]));

    this.set('updateFilter', validFilters => {
      assert.equal(validFilters.length, 1);
      assert.equal(validFilters.get('firstObject.value'), true);
    });

    await render(hbs`
      {{#core/table-filter properties=properties updateFilter=(action updateFilter) as |filter|}}
        {{#filter.header class="row pb-1" as |header|}}
          {{#header.addButton class="add-button btn btn-primary col-1 offset-11"}}
            +
          {{/header.addButton}}
        {{/filter.header}}

        {{#filter.body as |body|}}
          {{#body.row class="row pb-1" as |row|}}
            {{row.property class="col-4"}}
            {{row.comparator class="col-4"}}
            {{row.value class="col-3 text-center"}}

            {{#if (gt row.count 1)}}
              {{#row.deleteButton class="btn btn-danger col-1"}}
                🗑
              {{/row.deleteButton}}
            {{/if}}
          {{/body.row}}
        {{/filter.body}}

        {{#filter.footer class="row" as |footer| }}
          {{#footer.filterButton class="filter-button btn btn-primary col-1 offset-10"}}
            +
          {{/footer.filterButton}}
          {{#footer.clearButton class="btn btn-primary col-1"}}
            🗘
          {{/footer.clearButton}}
        {{/filter.footer}}
      {{/core/table-filter}}
      `);
    await await click('.add-button');
    await await click('input');

    await await click('.filter-button');

  });

  test('it can filter data with boolean comparator -- false', async function(assert) {
    assert.expect(2);

    this.set('properties', A([
      filterObject.create({ label:'MH #', propertyType:'boolean',
        valueForQuery:'PA' })
    ]));

    this.set('updateFilter', validFilters => {
      assert.equal(validFilters.length, 1);
      assert.equal(validFilters.get('firstObject.value'), false);
    });

    await render(hbs`
      {{#core/table-filter properties=properties updateFilter=(action updateFilter) as |filter|}}
        {{#filter.header class="row pb-1" as |header|}}
          {{#header.addButton class="add-button btn btn-primary col-1 offset-11"}}
            +
          {{/header.addButton}}
        {{/filter.header}}

        {{#filter.body as |body|}}
          {{#body.row class="row pb-1" as |row|}}
            {{row.property class="col-4"}}
            {{row.comparator class="col-4"}}
            {{row.value class="col-3 text-center"}}

            {{#if (gt row.count 1)}}
              {{#row.deleteButton class="btn btn-danger col-1"}}
                🗑
              {{/row.deleteButton}}
            {{/if}}
          {{/body.row}}
        {{/filter.body}}

        {{#filter.footer class="row" as |footer| }}
          {{#footer.filterButton class="filter-button btn btn-primary col-1 offset-10"}}
            <i class="fa fa-filter" aria-hidden="true"></i>
          {{/footer.filterButton}}
          {{#footer.clearButton class="btn btn-primary col-1"}}
            🗘
          {{/footer.clearButton}}
        {{/filter.footer}}
      {{/core/table-filter}}
      `);
    await await click('.add-button');

    await await click('.filter-button');
  });
});
