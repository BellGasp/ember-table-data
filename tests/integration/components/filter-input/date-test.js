import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('filter-input/date', 'Integration | Component | filter input/date', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{filter-input/date}}`);

  assert.equal(this.$('.inputValue').length, 1, 'The input for date should be there');
});

test('it execute action on value change', function(assert) {
  assert.expect(1);
  this.set('testValueChange', () => {
    assert.ok(true);
  });

  this.render(hbs`{{filter-input/date valueChange=(action testValueChange)}}`);

  this.$('.inputValue').val('2016-01-02');
  this.$('.inputValue').change();
});
