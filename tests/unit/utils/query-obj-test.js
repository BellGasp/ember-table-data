import queryObj from 'dummy/utils/query-obj';
import { module, test } from 'qunit';

module('Unit | Utility | Query Obj');

test('It can be created with empty sorts and filters', function(assert) {
  assert.expect(3);

  let result = queryObj.create();

  assert.ok(result);
  assert.ok(result.get('sorts'));
  assert.ok(result.get('filters'));
});

test('It can be transfered to a queryableObject without sorts or filters', function(assert) {
  assert.expect(6);

  let result = queryObj.create({
    pageSize: 5,
    currentPage: 4
  });
  let queryableObject = result.toQueryableObject();

  assert.equal(queryableObject.pageSize, 5);
  assert.equal(queryableObject.currentPage, 4);

  assert.ok(queryableObject.sorts);
  assert.equal(queryableObject.sorts.length, 0);
  assert.ok(queryableObject.filters);
  assert.equal(queryableObject.filters.length, 0);
});

test('It can be transfered to a serializableObject without sorts or filters', function(assert) {
  assert.expect(4);

  let result = queryObj.create({
    pageSize: 5,
    currentPage: 4
  });
  let serializableObject = result.toSerializableObject();

  assert.equal(serializableObject.pageSize, 5);
  assert.equal(serializableObject.currentPage, 4);

  assert.notOk(serializableObject['Sorts[0].Column']);
  assert.notOk(serializableObject['Filters[0].Value']);
});

test('It can be transfered to a serializableObject with sorts', function(assert) {
  assert.expect(6);

  let result = queryObj.create({
    pageSize: 5,
    currentPage: 4,
    sorts: [
      { column: 'some-column', asc: true },
      { column: 'some-other-column', asc: false }
    ]
  });
  let serializableObject = result.toSerializableObject();

  assert.equal(serializableObject.pageSize, 5);
  assert.equal(serializableObject.currentPage, 4);

  assert.equal(serializableObject['Sorts[0].Asc'], true);
  assert.equal(serializableObject['Sorts[0].Column'], 'some-column');
  assert.equal(serializableObject['Sorts[1].Asc'], false);
  assert.equal(serializableObject['Sorts[1].Column'], 'some-other-column');
});

test('It can be transfered to a serializableObject with filters', function(assert) {
  assert.expect(7);

  let result = queryObj.create({
    pageSize: 5,
    currentPage: 4,
    filters: [
      {
        comparator: {
          internalName: 'isEmpty',
          valueForQuery: 'some-operator'
        },
        property: {
          propertyType: 'string',
          valueForQuery: 'some-query',
          columnWrapperForQuery: 'some-column',
        },
        value: 'test-value'
      }
    ]
  });
  let serializableObject = result.toSerializableObject();

  assert.equal(serializableObject.pageSize, 5);
  assert.equal(serializableObject.currentPage, 4);

  assert.equal(serializableObject['Filters[0].FieldName'], 'some-query');
  assert.equal(serializableObject['Filters[0].ColumnWrapper'], 'some-column');
  assert.equal(serializableObject['Filters[0].FieldValue'], 'test-value');
  assert.equal(serializableObject['Filters[0].Operator'], 'some-operator');
  assert.equal(serializableObject['Filters[0].FieldType'], 'string');
});

test('SerializableObject with filters and custom value/columnForQuery', function(assert) {
  assert.expect(4);

  let result = queryObj.create({
    pageSize: 5,
    currentPage: 4,
    filters: [
      {
        comparator: {
          internalName: 'isEmpty',
          valueForQuery: 'some-operator'
        },
        property: {
          propertyType: 'string',
          valueForQuery: 'some-query',
          valueForIsEmpty: 'some-other-query',
          columnWrapperForQuery: 'some-column',
          columnWrapperForIsEmpty: 'some-other-column',
        },
        value: 'test-value'
      }
    ]
  });
  let serializableObject = result.toSerializableObject();

  assert.equal(serializableObject.pageSize, 5);
  assert.equal(serializableObject.currentPage, 4);

  assert.equal(serializableObject['Filters[0].FieldName'], 'some-other-query');
  assert.equal(serializableObject['Filters[0].ColumnWrapper'], 'some-other-column');
});

test('SerializableObject with filters and non-custom value/columnForQuery', function(assert) {
  assert.expect(4);

  let result = queryObj.create({
    pageSize: 5,
    currentPage: 4,
    filters: [
      {
        comparator: {
          internalName: 'someTestInternalName',
          valueForQuery: 'some-operator'
        },
        property: {
          propertyType: 'string',
          valueForQuery: 'some-query',
          valueForIsEmpty: 'some-other-query',
          columnWrapperForQuery: 'some-column',
          columnWrapperForIsEmpty: 'some-other-column',
        },
        value: 'test-value'
      }
    ]
  });
  let serializableObject = result.toSerializableObject();

  assert.equal(serializableObject.pageSize, 5);
  assert.equal(serializableObject.currentPage, 4);

  assert.equal(serializableObject['Filters[0].FieldName'], 'some-query');
  assert.equal(serializableObject['Filters[0].ColumnWrapper'], 'some-column');
});

test('SerializableObject with filters and number property', function(assert) {
  assert.expect(3);

  let result = queryObj.create({
    pageSize: 5,
    currentPage: 4,
    filters: [
      {
        comparator: {
          internalName: 'someTestInternalName',
          valueForQuery: 'some-operator'
        },
        property: {
          propertyType: 'number',
          valueForQuery: 'some-query',
          columnWrapperForQuery: 'some-column',
        },
        value: 'test-value'
      }
    ]
  });
  let serializableObject = result.toSerializableObject();

  assert.equal(serializableObject.pageSize, 5);
  assert.equal(serializableObject.currentPage, 4);

  assert.equal(serializableObject['Filters[0].FieldType'], 'int');
});

test('SerializableObject with filters and date property', function(assert) {
  assert.expect(3);

  let result = queryObj.create({
    pageSize: 5,
    currentPage: 4,
    filters: [
      {
        comparator: {
          internalName: 'someTestInternalName',
          valueForQuery: 'some-operator'
        },
        property: {
          propertyType: 'date',
          valueForQuery: 'some-query',
          columnWrapperForQuery: 'some-column',
        },
        value: 'test-value'
      }
    ]
  });
  let serializableObject = result.toSerializableObject();

  assert.equal(serializableObject.pageSize, 5);
  assert.equal(serializableObject.currentPage, 4);

  assert.equal(serializableObject['Filters[0].FieldType'], 'datetime');
});
