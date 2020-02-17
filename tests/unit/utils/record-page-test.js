import recordPage from 'dummy/utils/record-page';
import { module, test } from 'qunit';

module('Unit | Utility | record page', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    let result = recordPage.create();
    assert.ok(result);
    assert.ok(result.get('records'));
  });
});
