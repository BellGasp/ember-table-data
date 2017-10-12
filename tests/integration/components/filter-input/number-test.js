import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('filter-input/number', 'Integration | Component | filter input/number', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{filter-input/number}}`);

  assert.equal(this.$('.inputValue').length, 1, 'The input for number should be there');
});

test('it execute action on value change', function(assert) {
  assert.expect(1);
  this.set('testValueChange', () => {
    assert.ok(true);
  });

  this.render(hbs`{{filter-input/number valueChange=(action testValueChange)}}`);

  this.$('.inputValue').val(3);
  this.$('.inputValue').change();
});
