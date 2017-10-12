import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('core/filter/filter-row', 'Integration | Component | core/filter/filter row', {
  integration: true
});

test('it renders and show the error the for missing component for empty type', function(assert) {
  this.render(hbs`{{core/filter/filter-row}}`);

  assert.equal(this.$().text().trim(), '');
});
