import { moduleFor, test } from 'ember-qunit';

moduleFor('service:table-data', 'Unit | Service | table data', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

// Valid cases

test('isPossiblePage 1', function(assert) {
  let service = this.subject();
  assert.ok(service.isPossiblePage(1, 15, 30));
});

test('isPossiblePage 2', function(assert) {
  let service = this.subject();
  assert.ok(service.isPossiblePage(1, 15, 15));
});

test('isPossiblePage 3', function(assert) {
  let service = this.subject();
  assert.ok(service.isPossiblePage(1, 15, 1));
});

test('isPossiblePage 4', function(assert) {
  let service = this.subject();
  assert.ok(service.isPossiblePage(3, 5, 15));
});

test('isPossiblePage 44', function(assert) {
  let service = this.subject();
  assert.ok(service.isPossiblePage(3, 5, 12));
});

test('isPossiblePage 45', function(assert) {
  let service = this.subject();
  assert.ok(service.isPossiblePage(1, 15, 0));
});

// Invalid cases

test('isPossiblePage 5', function(assert) {
  let service = this.subject();
  assert.notOk(service.isPossiblePage(0, 15, 15));
});

test('isPossiblePage 6', function(assert) {
  let service = this.subject();
  assert.notOk(service.isPossiblePage(3, 5, 10));
});

test('isPossiblePage 7', function(assert) {
  let service = this.subject();
  assert.notOk(service.isPossiblePage(-1, 15, 15));
});

test('isPossiblePage 8', function(assert) {
  let service = this.subject();
  assert.notOk(service.isPossiblePage(3, 15, 0));
});
