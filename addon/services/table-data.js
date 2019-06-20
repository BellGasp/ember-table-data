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
    return page === 1 || page > 0 && (page <= maxPage || totalCount === 0);
  },

  loadPage(records, queryObj) {
    var recordPage = RecordPage.create();
    recordPage.page = queryObj.get('currentPage');
    recordPage.records = this.loadRecords(records, queryObj);
    return recordPage;
  },

  loadRecords(records, query) {
    let recordsPromise;

    if (typeof(records) === 'function') {
      recordsPromise = records(query);
    } else {
      recordsPromise = this.paginateRecords(records);
    }

    return PromiseArray.create({
      promise: resolve(recordsPromise)
    });
  },

  paginateRecords(records, { currentPage = 1, pageSize = 5 } = {}) {
    let firstRecordIndex = currentPage * pageSize - pageSize;
    return records.slice(firstRecordIndex,firstRecordIndex + pageSize);
  },

  createComparators(comparatorsToCreate) {
    return A(comparatorsToCreate.map(comparator => this.createComparator(comparator)));
  },

  createComparator({ propertyType, internalName, label, valueForQuery, showInput }) {
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
    return this.createComparators([
      { propertyType: 'string', label: 'Contains', internalName: 'contains', valueForQuery:'{0}.Contains("{1}")' },
      { propertyType: 'string', label: 'Ends with', internalName: 'endsWith', valueForQuery:'{0}.EndsWith("{1}")' },
      { propertyType: 'string', label: 'Equal', internalName: 'equal', valueForQuery:'{0} == "{1}"' },
      { propertyType: 'string', label: 'Not contains', internalName: 'notContains', valueForQuery:'!({0}.Contains("{1}"))' },
      { propertyType: 'string', label: 'Not ends with', internalName: 'notEndsWith', valueForQuery:'!({0}.EndsWith("{1}"))' },
      { propertyType: 'string', label: 'Not equal', internalName: 'notEqual', valueForQuery:'{0} != "{1}"' },
      { propertyType: 'string', label: 'Not starts with', internalName: 'notStartsWith', valueForQuery:'!({0}.StartsWith("{1}"))' },
      { propertyType: 'string', label: 'Starts with', internalName: 'startsWith', valueForQuery:'{0}.StartsWith("{1}")' },
      { propertyType: 'string', label: 'Is Empty', internalName: 'isEmpty', valueForQuery:'{0} == {1} || {0} == ""', showInput:false }
    ]);
  }),

  numberComparators: computed(function() {
    return this.createComparators([
      { propertyType: 'number', label: '<>', internalName: 'notEqual', valueForQuery:'{0} != {1}' },
      { propertyType: 'number', label: '<', internalName: 'lessThan', valueForQuery:'{0} < {1}' },
      { propertyType: 'number', label: '<=', internalName: 'lessThanOrEqual', valueForQuery:'{0} <= {1}' },
      { propertyType: 'number', label: '=', internalName: 'equal', valueForQuery:'{0} == {1}' },
      { propertyType: 'number', label: '>', internalName: 'greaterThan', valueForQuery:'{0} > {1}' },
      { propertyType: 'number', label: '>=', internalName: 'greaterThanOrEqual', valueForQuery:'{0} >= {1}' },
      { propertyType: 'number', label: 'Is Empty', internalName: 'isEmpty', valueForQuery:'{0} == {1}', showInput: false }
    ]);
  }),

  dateComparators: computed(function() {
    return this.createComparators([
      { propertyType: 'date', label: '<>', internalName: 'notEqual', valueForQuery:'{0} != {1}' },
      { propertyType: 'date', label: '<', internalName: 'lessThan', valueForQuery:'{0} < {1}' },
      { propertyType: 'date', label: '<=', internalName: 'lessThanOrEqual', valueForQuery:'{0} <= {1}' },
      { propertyType: 'date', label: '=', internalName: 'equal', valueForQuery:'{0} == {1}' },
      { propertyType: 'date', label: '>', internalName: 'greaterThan', valueForQuery:'{0} > {1}' },
      { propertyType: 'date', label: '>=', internalName: 'greaterThanOrEqual', valueForQuery:'{0} >= {1}' },
      { propertyType: 'date', label: 'Is Empty', internalName: 'isEmpty', valueForQuery:'{0} == {1}', showInput: false }
    ]);
  }),

  booleanComparators: computed(function() {
    return this.createComparators([
      { propertyType: 'boolean', label: '<>', internalName: 'notEqual', valueForQuery:'{0} != {1}' },
      { propertyType: 'boolean', label: '=', internalName: 'equal', valueForQuery:'{0} == {1}' }
    ]);
  }),

  dropdownComparators: computed(function() {
    return this.createComparators([
      { propertyType: 'dropdown', label: '<>', internalName: 'notEqual', valueForQuery:'{0} != {1}' },
      { propertyType: 'dropdown', label: '=', internalName: 'equal', valueForQuery:'{0} == {1}' }
    ]);
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
