import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('core/filter/filter-row', 'Integration | Component | core/filter/filter row', {
  integration: true
});

test('it renders nothing when not using the exposed component', function(assert) {
  this.set('deleteRow', () => {});
  this.render(hbs`{{core/filter/filter-row deleteRow=(action deleteRow)}}`);

  assert.equal(this.$().text().trim(), '');
});
