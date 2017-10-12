import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { A } from '@ember/array';

moduleForComponent('core/table-filter', 'Integration | Component | core/table filter', {
  integration: true
});

test('it renders nothing without error when you don\'t use the inner component', function(assert) {

  this.render(hbs`{{core/table-filter}}`);
  assert.equal(this.$().text().trim(), '', 'This component is block component using exposed component');
});

test('it renders header when you use the inner component', function(assert) {

  this.render(hbs`
    {{#core/table-filter as |filter|}}
      {{filter.header class="testHeaderClass"}}
    {{/core/table-filter}}
    `);
  assert.equal(this.$('.testHeaderClass').length, 1, 'The yeld for header is generating correctly');
});

test('it renders body when you use the inner component', function(assert) {

  this.render(hbs`
    {{#core/table-filter as |filter|}}
      {{filter.body class="testHeaderClass"}}
    {{/core/table-filter}}
    `);
  assert.equal(this.$('.testHeaderClass').length, 1, 'The yeld for body is generating correctly');
});

test('it renders footer when you use the inner component', function(assert) {

  this.render(hbs`
    {{#core/table-filter as |filter|}}
      {{filter.footer class="testHeaderClass"}}
    {{/core/table-filter}}
    `);
  assert.equal(this.$('.testHeaderClass').length, 1, 'The yeld for footer is generating correctly');
});

test('it execute addRow action correctly when action is executed', function(assert) {
  assert.expect(2);
  this.set('rows', new A());
  assert.equal(this.get('rows.length'), 0);
  this.render(hbs`
    {{#core/table-filter rows=rows as |filter|}}
      {{#filter.header as |header|}}
        {{header.addButton }}
      {{/filter.header}}
    {{/core/table-filter}}
    `);
  this.$('button').click();
  assert.equal(this.get('rows.length'), 1);
});

test('it execute addRow and then remove it correctly when action is executed', function(assert) {
  assert.expect(3);
  this.set('rows', new A());
  assert.equal(this.get('rows.length'), 0);
  this.render(hbs`
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
  this.$('.header > button').click();
  this.$('.header > button').click();
  assert.equal(this.get('rows.length'), 2);

  this.$('button.delete:eq(0)').click();
  assert.equal(this.get('rows.length'), 1);
});

test('it execute updateFilter action correctly when action is executed', function(assert) {
  assert.expect(1);
  this.set('rows', new A());
  this.set('externalAction', () => {
    assert.ok(true);
  });

  this.render(hbs`
    {{#core/table-filter rows=rows updateFilter=(action externalAction) as |filter|}}
      {{#filter.header class="header" as |header|}}
        {{header.addButton }}
      {{/filter.header}}

      {{#filter.footer as |footer| }}
        {{footer.filterButton class="filter"}}
      {{/filter.footer}}
    {{/core/table-filter}}
    `);

  this.$('.header > button').click();
  this.$('button.filter').click();
});

test('it execute updateFilter action correctly when action is executed', function(assert) {
  assert.expect(2);
  this.set('rows', new A());
  this.set('externalAction', () => {
    assert.ok(true);
  });

  this.render(hbs`
    {{#core/table-filter rows=rows updateFilter=(action externalAction) as |filter|}}
      {{#filter.header class="header" as |header|}}
        {{header.addButton }}
      {{/filter.header}}

      {{#filter.footer as |footer| }}
        {{footer.clearButton class="clear"}}
      {{/filter.footer}}
    {{/core/table-filter}}
    `);

  this.$('.header > button').click();
  this.$('.header > button').click();
  this.$('.header > button').click();
  this.$('.header > button').click();
  this.$('.header > button').click();
  this.$('button.clear').click();
  assert.equal(this.get('rows.length'), 0);
});
