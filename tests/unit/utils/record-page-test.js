import recordPage from 'dummy/utils/record-page';
import { module, test } from 'qunit';

module('Unit | Utility | Record Page');

test('it works', function(assert) {
  assert.expect(3);
  let result = recordPage.create();

  assert.ok(result);
  assert.ok(result.get('records'));
  assert.ok(result.get('lastUpdated'));
});
