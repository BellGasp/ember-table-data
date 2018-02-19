import filterRowObject from 'dummy/utils/filter-row-object';
import { module, test } from 'qunit';

module('Unit | Utility | Filter Row Object');

test('it works', function(assert) {
  assert.expect(1);
  let result = filterRowObject.create();

  assert.ok(result);
});
