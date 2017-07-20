import queryObj from 'dummy/utils/query-obj';
import { module, test } from 'qunit';

module('Unit | Utility | query obj');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = queryObj.create();
  assert.ok(result);
  assert.ok(result.get('sorts'));
  assert.ok(result.get('filters'));
});
