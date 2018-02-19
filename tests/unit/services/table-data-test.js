import QueryObj from 'dummy/utils/query-obj';
import { moduleFor, test } from 'ember-qunit';
import { get } from '@ember/object';
import { Promise } from 'rsvp';

moduleFor('service:table-data', 'Unit | Service | table data');

test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('Can paginate records first page', function(assert) {
  assert.expect(3);

  let service = this.subject();
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

  let service = this.subject();
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

  let service = this.subject();
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

test('Can load records -- array single page', async function(assert) {
  let service = this.subject();
  let records = ['test1', 'test2'];
  let queryObj = QueryObj.create({ currentPage: 1, pageSize: 5 });

  let result = await service.loadRecords(records, queryObj);
  assert.equal(get(result, 'length'), 2);
});

test('Can load records -- array multiple pages', async function(assert) {
  let service = this.subject();
  let records = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let queryObj = QueryObj.create({ currentPage: 1, pageSize: 5 });

  let result = await service.loadRecords(records, queryObj);
  assert.equal(get(result, 'length'), 5);
  assert.equal(get(result, 'firstObject'), 1);
  assert.equal(get(result, 'lastObject'), 5);
});

test('Can load records -- function -> array', async function(assert) {
  let service = this.subject();
  let records = () => [1, 2, 3, 4, 5];
  let queryObj = QueryObj.create({ currentPage: 1, pageSize: 5 });

  let result = await service.loadRecords(records, queryObj);
  assert.equal(get(result, 'length'), 5);
});

test('Can load records -- function -> promise', async function(assert) {
  let service = this.subject();
  let records = () => new Promise((resolve, reject) => {
    resolve([1, 2, 3, 4, 5]);
    reject();
  });

  let queryObj = QueryObj.create({ currentPage: 1, pageSize: 5 });

  let result = await service.loadRecords(records, queryObj);
  assert.equal(get(result, 'length'), 5);
});

test('Can load page', async function(assert) {
  let service = this.subject();
  let records = ['test1', 'test2'];
  let queryObj = QueryObj.create({ currentPage: 1, pageSize: 5 });

  let result = await service.loadPage(records, queryObj);
  assert.equal(get(result, 'records.length'), 2);
  assert.equal(get(result, 'page'), 1);
});
