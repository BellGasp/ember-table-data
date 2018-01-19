import Component from '@ember/component';
import FilterRow from 'ember-table-data/utils/filter-row-object';
import layout from '../../templates/components/core/table-filter';
import { A } from '@ember/array';
import { alias } from '@ember/object/computed';

export default Component.extend({
  layout,

  rows: null,

  init() {
    this._super(...arguments);

    if (!this.get('rows')) {
      this.initializeFilters();
    }
  },

  initializeFilters() {
    this.set('rows', A());
  },

  filtersRows: alias('rows'),

  actions:{
    addRow() {
      this.get('rows').pushObject(FilterRow.create());
    },

    deleteRow(row) {
      if (row.length){
        this.get('rows').removeObjects(row);
      } else {
        this.get('rows').removeObject(row);
      }
    },

    clearFilters() {
      this.initializeFilters();
      this.get('updateFilter')(this.get('filtersRows'));
    },

    filter() {
      let validFilter = this.get('filtersRows').filter(filter =>
        filter.get('property') &&
        filter.get('comparator') &&
        (filter.get('value') || !filter.get('comparator.showInput')));

      let invalidFilter = this.get('filtersRows').filter(filter =>
        validFilter.length === 0 ||
        !validFilter.any(validFilter => validFilter === filter));

      this.get('updateFilter')(validFilter);
      this.send('deleteRow', invalidFilter);
    }
  }
});
