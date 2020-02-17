import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | core/filter/filter row/value', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{core/filter/filter-row/value propertyType="string"}}`);

    assert.equal(this.element.querySelector('*').textContent.trim(), '');
  });
});
