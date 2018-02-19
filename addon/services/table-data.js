import Service from '@ember/service';
import { resolve } from 'rsvp';
import RecordPage from '../utils/record-page';
import DS from 'ember-data';
import ComparatorObject from 'ember-table-data/utils/comparator-object';
import { A } from '@ember/array';
import { isBlank } from '@ember/utils';
import { computed } from '@ember/object';

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
      recordsPromise = this.paginateRecords(records, queryObj);
    }

    return PromiseArray.create({
      promise: resolve(recordsPromise)
    });
  },
  paginateRecords(records, { currentPage, pageSize }) {
    let firstRecordIndex = currentPage * pageSize - pageSize;
    return A(records.slice(firstRecordIndex,firstRecordIndex + pageSize));
  },

  createComparator(propertyType, label, internalName, valueForQuery, showInput) {
    var comparator = ComparatorObject.create({
      label,
      internalName,
      propertyType,
      valueForQuery
    });

    if (!isBlank(showInput)) {
      comparator.set('showInput', showInput);
    }

    return comparator;
  },

  stringComparators: computed(function() {
    return A([
      this.createComparator('string', 'Contains', 'contains', '{0}.Contains("{1}")'),
      this.createComparator('string', 'Not contains', 'notContains', '!({0}.Contains("{1}"))'),
      this.createComparator('string', 'Ends with', 'endsWith', '{0}.EndsWith("{1}")'),
      this.createComparator('string', 'Not ends with', 'notEndsWith', '!({0}.EndsWith("{1}"))'),
      this.createComparator('string', 'Equal', 'equal', '{0} == "{1}"'),
      this.createComparator('string', 'Not equal', 'notEqual', '{0} != "{1}"'),
      this.createComparator('string', 'Starts with', 'startsWith', '{0}.StartsWith("{1}")'),
      this.createComparator('string', 'Not starts with', 'notStartsWith',
        '!({0}.StartsWith("{1}"))'),
      this.createComparator('string', 'Is Empty', 'isEmpty', '{0} == {1} || {0} == ""', false)
    ]);
  }),

  numberComparators: computed(function() {
    return A([
      this.createComparator('number','=', 'equal', '{0} == {1}'),
      this.createComparator('number','<>', 'notEqual', '{0} != {1}'),
      this.createComparator('number','<', 'lessThan', '{0} < {1}'),
      this.createComparator('number','<=', 'lessThanOrEqual', '{0} <= {1}'),
      this.createComparator('number','>', 'greaterThan', '{0} > {1}'),
      this.createComparator('number','>=', 'greaterThanOrEqual', '{0} >= {1}'),
      this.createComparator('number','Is Empty', 'isEmpty', '{0} == {1}', false)
    ])
  }),

  dateComparators: computed(function() {
    return A([
      this.createComparator('date', '=', 'equal', '{0} == {1}'),
      this.createComparator('date', '<>', 'notEqual', '{0} != {1}'),
      this.createComparator('date', '<', 'lessThan', '{0} < {1}'),
      this.createComparator('date', '<=', 'lessThanOrEqual', '{0} <= {1}'),
      this.createComparator('date', '>', 'greaterThan', '{0} > {1}'),
      this.createComparator('date', '>=', 'greaterThanOrEqual', '{0} >= {1}'),
      this.createComparator('date', 'Is Empty', 'isEmpty', '{0} == {1}', false)
    ])
  }),

  booleanComparators: computed(function() {
    return A([
      this.createComparator('boolean', '=', 'equal', '{0} == {1}'),
      this.createComparator('boolean', '<>', 'notEqual', '{0} != {1}')
    ])
  }),

  dropdownComparators: computed(function() {
    return A([
      this.createComparator('dropdown', '=', 'equal', '{0} == {1}'),
      this.createComparator('dropdown', '<>', 'notEqual', '{0} != {1}')
    ])
  }),

  defaultComparators(){
    return A([].concat(
      this.get('stringComparators'),
      this.get('numberComparators'),
      this.get('dateComparators'),
      this.get('booleanComparators'),
      this.get('dropdownComparators')
    ));
  }
});
