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

test('Can get first page', function(assert) {
  let service = this.subject();
  assert.ok(service.isPossiblePage(1, 15, 30));
});

test('Can get full only page', function(assert) {
  let service = this.subject();
  assert.ok(service.isPossiblePage(1, 15, 15));
});

test('Can get non-full only page', function(assert) {
  let service = this.subject();
  assert.ok(service.isPossiblePage(1, 15, 1));
});

test('Can get full last page', function(assert) {
  let service = this.subject();
  assert.ok(service.isPossiblePage(3, 5, 15));
});

test('Can get non-full last page', function(assert) {
  let service = this.subject();
  assert.ok(service.isPossiblePage(3, 5, 12));
});

test('Can get first page if no records', function(assert) {
  let service = this.subject();
  assert.ok(service.isPossiblePage(1, 15, 0));
});

// Invalid cases

test('Cannot get page 0', function(assert) {
  let service = this.subject();
  assert.notOk(service.isPossiblePage(0, 15, 15));
});

test('Cannot get page after last page (full last page)', function(assert) {
  let service = this.subject();
  assert.notOk(service.isPossiblePage(3, 5, 10));
});

test('Cannot get negative page', function(assert) {
  let service = this.subject();
  assert.notOk(service.isPossiblePage(-1, 15, 15));
});

test('Cannot get page x != 1 if no records', function(assert) {
  let service = this.subject();
  assert.notOk(service.isPossiblePage(3, 15, 0));
});
