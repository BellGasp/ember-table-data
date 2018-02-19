import comparatorObject from 'dummy/utils/comparator-object';
import { module, test } from 'qunit';

module('Unit | Utility | Comparator Object');

test('it works', function(assert) {
  assert.expect(1);
  let result = comparatorObject.create();

  assert.ok(result);
});

test('it is initialized with showInput and showComparator', function(assert) {
  assert.expect(2);
  let result = comparatorObject.create();

  assert.equal(result.showInput, true);
  assert.equal(result.showComparator, true);
});
