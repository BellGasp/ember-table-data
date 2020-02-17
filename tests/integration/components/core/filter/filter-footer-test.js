import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | core/filter/filter footer', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs `{{core/filter/filter-footer}}`);

    assert.equal(this.element.querySelector('*').textContent.trim(), '', 'Theres no default layout to the component. ' +
      'Should be empty if you dont use yeld component');
  });
});
