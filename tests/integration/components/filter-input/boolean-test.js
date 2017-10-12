import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('filter-input/boolean', 'Integration | Component | filter input/boolean', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{filter-input/boolean}}`);

  assert.equal(this.$('.inputValue').length, 1, 'The input for boolean should be there');
});

test('it execute action on value change', function(assert) {
  assert.expect(1);
  this.set('testValueChange', () => {
    assert.ok(true);
  });

  this.set('_selectedValue', true);

  this.render(hbs`{{filter-input/boolean valueChange=(action testValueChange) _selectedValue=_selectedValue}}`);

  this.set('_selectedValue', false);
});
