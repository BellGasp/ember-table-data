import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | core/page numbers/page link', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{core/page-numbers/page-link}}`);

    assert.equal(this.element.querySelector('*').textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#core/page-numbers/page-link}}
        template block text
      {{/core/page-numbers/page-link}}
    `);

    assert.equal(this.element.querySelector('*').textContent.trim(), 'template block text');
  });
});
