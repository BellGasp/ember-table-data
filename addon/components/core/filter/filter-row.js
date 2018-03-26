import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import layout from 'ember-table-data/templates/components/core/filter/filter-row';

export default Component.extend({
  layout,

  filterRowObject: null,

  filteredComparators: computed('comparators', 'filterRowObject.property', function() {
    let comparators = this.get('comparators');
    if (comparators){
      let propertyType = this.get('filterRowObject.property.propertyType');
      return A(comparators.filterBy('propertyType', propertyType));
    }

    return A();
  }),

  actions: {
    inputChange(value) {
      this.set('filterRowObject.value', value);
    }
  }
});
