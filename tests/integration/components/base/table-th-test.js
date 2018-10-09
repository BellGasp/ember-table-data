import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | base/table-th', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);

    await render(hbs`
      {{#base/table-th}}A{{/base/table-th}}
    `);

    assert.dom('th').exists();
    assert.dom('th').hasText('A');
  });

  test('it cycle through the available sort states', async function(assert) {
    assert.expect(4);

    await render(hbs`{{base/table-th sort="property"}}`);

    assert.dom('.sort-direction.fa.fa-sort').exists();

    await click('th');

    assert.dom('.sort-direction.fa.fa-sort-asc').exists();

    await click('th');

    assert.dom('.sort-direction.fa.fa-sort-desc').exists();

    await click('th');

    assert.dom('.sort-direction.fa.fa-sort').exists();
  });

  test('it notifies observers of the sort state changes', async function(assert) {
    assert.expect(6);

    const directions = ['unsorted', 'asc', 'desc'];
    let clicks = 0;

    this.set('notification', ({ key, direction }) => {
      clicks++;

      assert.equal(key, 'name');
      assert.equal(direction, directions[clicks % 3]);
    });

    await render(hbs`{{base/table-th sort="name" notifyObservers=(action notification)}}`);

    await click('th');
    await click('th');
    await click('th');
  });

  test('it disables sorting when no `sort` property is passed', async function(assert) {
    assert.expect(4);

    await render(hbs`{{base/table-th}}`);

    assert.dom('.sort-direction').doesNotExist();
    assert.dom('.sort-order').doesNotExist();

    await click('th');

    assert.dom('.sort-direction').doesNotExist();
    assert.dom('.sort-order').doesNotExist();
  });
});
