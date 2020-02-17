import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | base/table cell', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders as td', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    // Template block usage:
    await render(hbs`
      <table>
        <tbody>
          <tr>
            {{#base/table-cell}}
              template block text
            {{/base/table-cell}}
          </tr>
        </tbody>
      </table>
    `);

    assert.equal(this.element.querySelectorAll('tr td').length, 1);
    assert.equal(this.element.querySelector('tr td').textContent.trim(), 'template block text');
  });

  test('it renders as th', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    // Template block usage:
    await render(hbs`
      <table>
        <tbody>
          <tr>
            {{#base/table-cell tagName='th'}}
              template block text
            {{/base/table-cell}}
          </tr>
        </tbody>
      </table>
    `);

    assert.equal(this.element.querySelectorAll('tr td').length, 0);
    assert.equal(this.element.querySelectorAll('tr th').length, 1);
    assert.equal(this.element.querySelector('tr th').textContent.trim(), 'template block text');
  });
});
