import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | core/filter/filter button', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{core/filter/filter-button}}`);

    assert.equal(this.element.querySelector('*').textContent.trim(), '', 'Theres no default layout to the component. ' +
      'Should be empty if you dont use yeld component');
  });

  test('it render the component with blocks (button)', async function(assert) {

    await render(hbs`
      {{#core/filter/filter-button}}
        <p>test</p>
      {{/core/filter/filter-button}}
    `);

    assert.equal(this.element.querySelectorAll('button').length, 1, 'It render the button when using the addButton component');
    assert.equal(this.element.querySelectorAll('button > p').length, 1, 'It render the inner blocks when using the addButton component');
    assert.equal(this.element.querySelector('button > p').textContent.trim(), 'test', 'It render the inner text blocks when using the addButton component');
  });

  test('it execute action when click', async function(assert) {
    assert.expect(1);
    this.set('externalAction', () =>{
        assert.ok(true);
    });

    await render(hbs`
      {{#core/filter/filter-button click=(action externalAction)}}
        <p>test</p>
      {{/core/filter/filter-button}}
    `);

    await click('button');
  });
});
