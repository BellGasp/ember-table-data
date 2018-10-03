import Component from '@ember/component';
import FilterRow from 'ember-table-data/utils/filter-row-object';
import layout from '../../templates/components/core/table-filter';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import { isBlank } from '@ember/utils';

export default Component.extend({
  layout,

  rows: null,
  _rows: null,

  init() {
    this._super(...arguments);

    let rows = this.get('rows');

    if(!rows){
      this.initializeFilters();
    }else{
      this.set('_rows', rows);
    }
  },

  initializeFilters(){
    this.set('_rows', A());
  },

  filtersRows: computed('_rows', function(){
    let rows = this.get('_rows');

    return rows;
  }),

  actions:{
    addRow(){
      let rows = this.get('_rows');
      rows.pushObject(FilterRow.create());
    },
    deleteRow(row){
      if (row.length){
        this.get('_rows').removeObjects(row);
      } else {
        this.get('_rows').removeObject(row);
      }
    },
    clearFilters(){
      this.initializeFilters();
      this.get('updateFilter')(this.get('filtersRows'));
    },
    filter(){
      let filtersRows = this.get('filtersRows');
      let validFilter = A(
        filtersRows.filter(filter =>
          !isBlank(filter.get('property')) &&
          !isBlank(filter.get('comparator')) &&
          (!isBlank(filter.get('value')) || !filter.get('comparator.showInput'))
        )
      );

      let invalidFilter = A(
        filtersRows.filter(filter =>
          validFilter.length === 0 ||
          !validFilter.any(validFilter => validFilter === filter)
        )
      );

      this.get('updateFilter')(validFilter);
      this.send('deleteRow', invalidFilter);
    }
  }
});
