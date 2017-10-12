import Component from '@ember/component';
import layout from 'ember-table-data/templates/components/core/filter/filter-row';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
  layout,

  filterRowObject: null,

  filteredComparators: computed('comparators', 'filterRowObject.property', function() {
    if (this.get('comparators')){
    return A(this.get('comparators').filterBy('propertyType', this.get(
      'filterRowObject.property.propertyType')));
    }

    return new A();
  }),

  actions: {
    inputChange(value) {
      this.set('filterRowObject.value', value);
    }
  }
});
