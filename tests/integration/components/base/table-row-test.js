import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | base/table row', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    // Template block usage:
    await render(hbs`
      <table>
        {{#base/table-row}}
          <td>template block text</td>
        {{/base/table-row}}
      </table>
    `);

    assert.equal(this.element.querySelectorAll('table tr').length, 1);
    assert.equal(this.element.querySelector('table tr').textContent.trim(), 'template block text');
  });
});
