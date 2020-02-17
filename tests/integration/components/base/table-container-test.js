import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | base/table container', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      {{#base/table-container}}
          <tr>
            <td>Test text block</td>
          </tr>
      {{/base/table-container}}
    `);

    assert.equal(this.element.querySelector('*').textContent.trim(), 'Test text block');
    assert.equal(this.element.querySelectorAll('table').length, 1);
  });
});
