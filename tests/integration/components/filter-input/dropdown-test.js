import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('filter-input/dropdown', 'Integration | Component | filter input/dropdown', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{filter-input/dropdown}}`);

  assert.equal(this.$().text().trim(), 'No implemented yet.', 'This feature is not implemented yet');
});
