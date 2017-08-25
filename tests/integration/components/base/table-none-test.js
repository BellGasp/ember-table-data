import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('base/table-none', 'Integration | Component | base/table none', {
  integration: true
});

test('it renders', function(assert) {

  // Template block usage:
  this.render(hbs`
    {{#base/table-none}}
      template block text
    {{/base/table-none}}
  `);

  assert.equal(this.$().text().trim(), '');
});
