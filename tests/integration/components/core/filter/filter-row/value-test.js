import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('core/filter/filter-row/value', 'Integration | Component | core/filter/filter row/value', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{core/filter/filter-row/value propertyType="string"}}`);

  assert.equal(this.$().text().trim(), '');
});
