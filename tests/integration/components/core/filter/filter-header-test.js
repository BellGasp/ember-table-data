import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | core/filter/filter header', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    
    await render(hbs`{{core/filter/filter-header}}`);

    assert.equal(this.element.querySelector('*').textContent.trim(), '', 'Theres no default layout to the component. ' +
      'Should be empty if you dont use yeld component');
  });

  test('it render the available component (button)', async function(assert) {

    await render(hbs`
      {{#core/filter/filter-header as |header|}}
        {{header.addButton class="testAddButton"}}
      {{/core/filter/filter-header}}
      `);

    assert.equal(this.element.querySelectorAll('.testAddButton').length, 1, 'It render the addButton when using the component');
  });
});
