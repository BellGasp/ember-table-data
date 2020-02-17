import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | filter input/boolean', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);
    this.set('testValueChange', () => {
      assert.ok(true);
    });

    await render(hbs`{{filter-input/boolean valueChange=(action testValueChange)}}`);

    assert.equal(this.element.querySelectorAll('.inputValue').length, 1, 'The input for boolean should be there');
  });

  test('it execute action on value change', async function(assert) {
    assert.expect(2);

    this.set('testValueChange', () => {
      assert.ok(true);
    });

    await render(hbs`{{filter-input/boolean valueChange=(action testValueChange)}}`);

    await click('input');
  });
});
