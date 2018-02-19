import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('core/filter/filter-header',
  'Integration | Component | core/filter/filter header', {
    integration: true
  }
);

test('it renders', function(assert) {

  this.render(hbs`{{core/filter/filter-header}}`);

  assert.equal(this.$().text().trim(), '', 'Theres no default layout to the component. ' +
    'Should be empty if you dont use yeld component');
});

test('it render the available component (button)', function(assert) {

  this.render(hbs`
    {{#core/filter/filter-header as |header|}}
      {{header.addButton class="testAddButton"}}
    {{/core/filter/filter-header}}
    `);

  assert.equal(this.$('.testAddButton').length, 1,
    'It render the addButton when using the component');
});
