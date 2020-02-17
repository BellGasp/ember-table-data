import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | table data', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let service = this.owner.lookup('service:table-data');
    assert.ok(service);
  });

  test('Can paginate records first page', function(assert) {
    assert.expect(3);

    let service = this.owner.lookup('service:table-data');
    let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let queryObj = {
      currentPage: 1,
      pageSize: 3
    };

    let paginatedResult = service.paginateRecords(array, queryObj);

    assert.equal(paginatedResult.length, 3);
    assert.equal(paginatedResult[0], 1);
    assert.equal(paginatedResult[2], 3);
  });

  test('Can paginate records last page', function(assert) {
    assert.expect(2);

    let service = this.owner.lookup('service:table-data');
    let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let queryObj = {
      currentPage: 4,
      pageSize: 3
    };

    let paginatedResult = service.paginateRecords(array, queryObj);

    assert.equal(paginatedResult.length, 1);
    assert.equal(paginatedResult[0], 10);
  });

  test('Can paginate records middle page', function(assert) {
    assert.expect(3);

    let service = this.owner.lookup('service:table-data');
    let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let queryObj = {
      currentPage: 2,
      pageSize: 3
    };

    let paginatedResult = service.paginateRecords(array, queryObj);

    assert.equal(paginatedResult.length, 3);
    assert.equal(paginatedResult[0], 4);
    assert.equal(paginatedResult[2], 6);
  });

  // Valid cases

  test('Can get first page', function(assert) {
    let service = this.owner.lookup('service:table-data');
    assert.ok(service.isPossiblePage(1, 15, 30));
  });

  test('Can get full only page', function(assert) {
    let service = this.owner.lookup('service:table-data');
    assert.ok(service.isPossiblePage(1, 15, 15));
  });

  test('Can get non-full only page', function(assert) {
    let service = this.owner.lookup('service:table-data');
    assert.ok(service.isPossiblePage(1, 15, 1));
  });

  test('Can get full last page', function(assert) {
    let service = this.owner.lookup('service:table-data');
    assert.ok(service.isPossiblePage(3, 5, 15));
  });

  test('Can get non-full last page', function(assert) {
    let service = this.owner.lookup('service:table-data');
    assert.ok(service.isPossiblePage(3, 5, 12));
  });

  test('Can get first page if no records', function(assert) {
    let service = this.owner.lookup('service:table-data');
    assert.ok(service.isPossiblePage(1, 15, 0));
  });

  // Invalid cases

  test('Cannot get page 0', function(assert) {
    let service = this.owner.lookup('service:table-data');
    assert.notOk(service.isPossiblePage(0, 15, 15));
  });

  test('Cannot get page after last page (full last page)', function(assert) {
    let service = this.owner.lookup('service:table-data');
    assert.notOk(service.isPossiblePage(3, 5, 10));
  });

  test('Cannot get negative page', function(assert) {
    let service = this.owner.lookup('service:table-data');
    assert.notOk(service.isPossiblePage(-1, 15, 15));
  });
});
