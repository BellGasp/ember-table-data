import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | filter input/string', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs `{{filter-input/string}}`);

    assert.equal(this.element.querySelectorAll('.inputValue').length, 1, 'The input for string should be there');
  });

  test('it execute action on value change', async function(assert) {
    assert.expect(1);
    this.set('testValueChange', () => {
      assert.ok(true);
    });

    await render(hbs`{{filter-input/string valueChange=(action testValueChange)}}`);

    await fillIn('.inputValue', 'TEST');
  });
});
