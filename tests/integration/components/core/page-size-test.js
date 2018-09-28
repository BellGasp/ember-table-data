import { nativeMouseDown, nativeMouseUp } from 'ember-power-select/test-support/helpers';
import hbs from 'htmlbars-inline-precompile';
import { render, pauseTest } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Component | core/page-size', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with default page size', async function(assert) {
    assert.expect(2);

    this.set('externalAction', actual => {
      assert.equal(actual, 5, 'submitted value is passed to external action');
    });

    await render(hbs`{{core/page-size updatePageSize=(action externalAction)}}`);

    assert.dom('.ember-power-select-selected-item').containsText('5');
  });

  test('it renders with given page size', async function(assert) {
    assert.expect(1);

    this.set('pageSize', 10);

    await render(hbs`{{core/page-size pageSize=pageSize}}`);

    assert.dom('.ember-power-select-selected-item').containsText('10');
  });

  test('it renders with invalid page size', async function(assert) {
    assert.expect(2);

    this.setProperties({
      externalAction: actual => {
        assert.equal(actual, 5, 'submitted value is passed to external action');
      },
      pageSize: 11
    });

    await render(hbs`{{core/page-size pageSize=pageSize updatePageSize=(action externalAction)}}`);

    assert.dom('.ember-power-select-selected-item').containsText('5');
  });

  test('Can select another page size (10)', async function(assert) {
    assert.expect(4);

    this.setProperties({
      externalAction: actual => {
        assert.equal(actual, this.get('expectedValue'), `submitted value is passed to external action (${actual})`);
      },
      expectedValue: 5
    });

    await render(hbs`{{core/page-size updatePageSize=(action externalAction)}}`);

    assert.dom('.ember-power-select-selected-item').containsText('5');

    this.set('expectedValue', 10);

    await nativeMouseDown('.ember-power-select-trigger');
    await nativeMouseUp('.ember-power-select-option:nth-child(2)');

    assert.dom('.ember-power-select-selected-item').containsText('10');
  });

  test('It renders with custom page sizes', async function(assert) {
    this.set('expectedValue', 6);
    this.set('externalAction', actual => {
      assert.equal(actual, this.get('expectedValue'), `submitted value is passed to external action (${actual})`);
    });
    this.set('pageSizes', [6, 11]);

    await render(hbs`{{core/page-size pageSizes=pageSizes updatePageSize=(action externalAction)}}`);

    assert.dom('.ember-power-select-selected-item').containsText('6');

    this.set('expectedValue', 11);

    await nativeMouseDown('.ember-power-select-trigger');
    await nativeMouseUp('.ember-power-select-option:nth-child(2)');

    assert.dom('.ember-power-select-selected-item').containsText('11');
  });

  test('It renders with custom page sizes', async function(assert) {
    assert.expect(1);

    this.setProperties({
      pageSize: 11,
      pageSizes: [6, 11]
    });

    await render(hbs`{{core/page-size pageSize=pageSize pageSizes=pageSizes}}`);

    assert.dom('.ember-power-select-selected-item').containsText('11');
  });
});

