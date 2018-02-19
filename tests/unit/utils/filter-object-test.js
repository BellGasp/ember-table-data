import filterObject from 'dummy/utils/filter-object';
import { module, test } from 'qunit';

module('Unit | Utility | Filter Object');

test('it works', function(assert) {
  assert.expect(1);
  let result = filterObject.create();

  assert.ok(result);
});
