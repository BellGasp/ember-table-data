import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';


module('Integration | Component | core/filter/filter row', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders nothing when not using the exposed component', async function(assert) {
    this.set('deleteRow', () => {});
    await render(hbs`{{core/filter/filter-row deleteRow=(action deleteRow)}}`);

    assert.equal(this.element.querySelector('*').textContent.trim(), '');
  });
});
