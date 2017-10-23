import Service from '@ember/service';
import { resolve } from 'rsvp';
import RecordPage from '../utils/record-page';
import DS from 'ember-data';
import ComparatorObject from 'ember-table-data/utils/comparator-object';
import { A } from '@ember/array';

const { PromiseArray } = DS;

export default Service.extend({
  isPossiblePage(page, pageSize, totalCount) {
    let maxPage = Math.ceil(totalCount / pageSize);
    return page === 1 || page > 0 && page <= maxPage;
  },

  loadPage(records, queryObj) {
    var recordPage = RecordPage.create();
    recordPage.page = queryObj.get('currentPage');
    recordPage.records = this.loadRecords(records, queryObj);
    return recordPage;
  },

  loadRecords(records, queryObj) {
    let recordsPromise;
    if (typeof(records) === 'function') {
      recordsPromise = records(queryObj.toQueryableObject(), queryObj.toSerializableObject());
    } else {
      recordsPromise = this.paginateRecords(records);
    }

    return PromiseArray.create({
      promise: resolve(recordsPromise)
    });
  },
  paginateRecords(records, {currentPage, pageSize}) {
    let firstRecordIndex = currentPage * pageSize - pageSize;
    return records.slice(firstRecordIndex,firstRecordIndex + pageSize);
  },
  defaultComparators(){
    return new A([
      ComparatorObject.create({label: 'Contains', internalName: 'contains', propertyType: 'string', valueForQuery:'{0}.Contains("{1}")'}),
      ComparatorObject.create({label: 'Ends with', internalName: 'endsWith', propertyType: 'string', valueForQuery:'{0}.EndsWith("{1}")'}),
      ComparatorObject.create({label: 'Equal', internalName: 'equal', propertyType: 'string', valueForQuery:'{0} == "{1}"'}),
      ComparatorObject.create({label: 'Not contains', internalName: 'notContains', propertyType: 'string', valueForQuery:'!({0}.Contains("{1}"))'}),
      ComparatorObject.create({label: 'Not ends with', internalName: 'notEndsWith', propertyType: 'string', valueForQuery:'!({0}.EndsWith("{1}"))'}),
      ComparatorObject.create({label: 'Not equal', internalName: 'notEqual', propertyType: 'string', valueForQuery:'{0} != "{1}"'}),
      ComparatorObject.create({label: 'Not starts with', internalName: 'notStartsWith', propertyType: 'string', valueForQuery:'!({0}.StartsWith("{1}"))'}),
      ComparatorObject.create({label: 'Starts with', internalName: 'startsWith', propertyType: 'string', valueForQuery:'{0}.StartsWith("{1}")'}),
      ComparatorObject.create({label: 'Is Empty', internalName: 'isEmpty', showInput:false, propertyType: 'string', valueForQuery:'{0} == {1} || {0} == ""'}),

      ComparatorObject.create({label: '<>', internalName: 'notEqual', propertyType: 'number', valueForQuery:'{0} != {1}'}),
      ComparatorObject.create({label: '<', internalName: 'lessThan', propertyType: 'number', valueForQuery:'{0} < {1}'}),
      ComparatorObject.create({label: '<=', internalName: 'lessThanOrEqual', propertyType: 'number', valueForQuery:'{0} <= {1}'}),
      ComparatorObject.create({label: '=', internalName: 'equal', propertyType: 'number', valueForQuery:'{0} == {1}'}),
      ComparatorObject.create({label: '>', internalName: 'greaterThan', propertyType: 'number', valueForQuery:'{0} > {1}'}),
      ComparatorObject.create({label: '>=', internalName: 'greaterThanOrEqual', propertyType: 'number', valueForQuery:'{0} >= {1}'}),
      ComparatorObject.create({label: 'Is Empty', internalName: 'isEmpty', showInput:false, propertyType: 'number', valueForQuery:'{0} == {1}'}),

      ComparatorObject.create({label: '<>', internalName: 'notEqual', propertyType: 'date', valueForQuery:'{0} != {1}'}),
      ComparatorObject.create({label: '<', internalName: 'lessThan', propertyType: 'date', valueForQuery:'{0} < {1}'}),
      ComparatorObject.create({label: '<=', internalName: 'lessThanOrEqual', propertyType: 'date', valueForQuery:'{0} <= {1}'}),
      ComparatorObject.create({label: '=', internalName: 'equal', propertyType: 'date', valueForQuery:'{0} == {1}'}),
      ComparatorObject.create({label: '>', internalName: 'greaterThan', propertyType: 'date', valueForQuery:'{0} > {1}'}),
      ComparatorObject.create({label: '>=', internalName: 'greaterThanOrEqual', propertyType: 'date', valueForQuery:'{0} >= {1}'}),
      ComparatorObject.create({label: 'Is Empty', internalName: 'isEmpty', showInput:false, propertyType: 'date', valueForQuery:'{0} == {1}'}),

      ComparatorObject.create({label: '<>', internalName: 'noEqual', propertyType: 'boolean', valueForQuery:'{0} != {1}'}),
      ComparatorObject.create({label: '=', internalName: 'equal', propertyType: 'boolean', valueForQuery:'{0} == {1}'})
    ]);
  }
});
