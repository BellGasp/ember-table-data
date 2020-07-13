import Component from '@ember/component';
import FilterRow from 'ember-table-data/utils/filter-row-object';
import layout from '../../templates/components/core/table-filter';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default Component.extend({
  layout,

  tableData: service(),

  rows: null,
  _rows: null,

  removeInvalidFiltersOnUpdate: false,

  init(){
    this._super(...arguments);
    this.initializeFilters(this.rows);
  },

  initializeFilters(rows){
    this.set('_rows', A());
    if (!isEmpty(rows)) this._rows.pushObjects(rows.map(r => FilterRow.create().copyFromObject(r)));
  },

  filtersRows: computed('_rows', function(){
    let rows = this.get('_rows');

    return rows;
  }),

  removeInvalidFilters(){
    let filtersRows = this.get('filtersRows');
    let validFilter = this.tableData.getValidFilters(filtersRows);
    let invalidFilter = A(
      filtersRows.filter(filter =>
        validFilter.length === 0 ||
        !validFilter.any(vf => vf === filter)
      )
    );
    this.send('deleteRow', invalidFilter);
  },

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
      if (this.get('removeInvalidFiltersOnUpdate')) {
        this.removeInvalidFilters();
      }

      let filtersRows = this.get('filtersRows');
      this.get('updateFilter')(filtersRows);
    }
  }
});
