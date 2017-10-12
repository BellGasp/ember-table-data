import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('core/filter/filter-body', 'Integration | Component | core/filter/filter body', {
  integration: true,
  need:['service:table-data']
});

test('it renders with out error if nothing is pass', function(assert) {
  this.render(hbs`{{core/filter/filter-body}}`);

  assert.equal(this.$().text().trim(), '', 'Theres no default layout to the component. ' +
    'Should be empty if you dont use yeld component');
});
