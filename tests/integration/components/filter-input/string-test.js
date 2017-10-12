import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('filter-input/string', 'Integration | Component | filter input/string', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs `{{filter-input/string}}`);

  assert.equal(this.$('.inputValue').length, 1, 'The input for string should be there');
});

test('it execute action on value change', function(assert) {
  assert.expect(1);
  this.set('testValueChange', () => {
    assert.ok(true);
  });

  this.render(hbs`{{filter-input/string valueChange=(action testValueChange)}}`);

  this.$('.inputValue').val("TEST");
  this.$('.inputValue').change();
});
