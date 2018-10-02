/* global server */
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | json api', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('it sorts multiple values when using the headers', async function(assert) {
    assert.expect(3);

    server.createList('character', 100);

    await visit('/json-api-serializer');

    await click('[data-test-sort-name]');
    await click('[data-test-sort-age]');
    await click('[data-test-sort-evil]');

    assert.dom('[data-test-sort-name] .sort-order').hasText('1');
    assert.dom('[data-test-sort-age] .sort-order').hasText('2');
    assert.dom('[data-test-sort-evil] .sort-order').hasText('3');
  });

  test('it keeps the order of the sorts based on the interaction order', async function(assert) {
    assert.expect(3);

    server.createList('character', 100);

    await visit('/json-api-serializer');

    await click('[data-test-sort-name]');
    await click('[data-test-sort-age]');
    await click('[data-test-sort-evil]');
    await click('[data-test-sort-name]');

    assert.dom('[data-test-sort-name] .sort-order').hasText('3');
    assert.dom('[data-test-sort-age] .sort-order').hasText('1');
    assert.dom('[data-test-sort-evil] .sort-order').hasText('2');
  });
});
