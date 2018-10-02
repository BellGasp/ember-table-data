import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | base/table-thead', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders as a `thead` and provides the `tr` automatically', async function(assert) {
    assert.expect(2);

    await render(hbs`{{base/table-thead}}`);

    assert.dom('thead').exists();
    assert.dom('tr').exists();
  });

  test('it yields the `table-th` component when using the block syntax', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#base/table-thead as |thead|}}
        {{#thead.th}}A{{/thead.th}}
        {{#thead.th}}B{{/thead.th}}
        {{#thead.th}}C{{/thead.th}}
      {{/base/table-thead}}
    `);

    assert.dom('th').exists({ count: 3 });
  });
});
