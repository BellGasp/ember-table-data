import Component from '@ember/component';
import layout from '../../../../templates/components/core/filter/filter-row/comparator';
import { set } from '@ember/object';
import { observer } from '@ember/object';

export default Component.extend({
  layout,

  init() {
    this._super(...arguments);

    let filterRowObject = this.get('filterRowObject');
    let filteredComparators = this.get('filteredComparators');

    if (filterRowObject && !filterRowObject.comparator && filteredComparators && filteredComparators.get('length') > 0) {
      set(filterRowObject, 'comparator', filteredComparators.get('firstObject'));
    }
  },

  getComparator(comparators, property, value) {
    if (!value || !property) return;

    return comparators.findBy(property, value);
  },

  resetComparator: observer('filteredComparators.@each.label', function() {
    let filteredComparators = this.get('filteredComparators');
    
    let currentComparatorInternalName = this.get('filterRowObject.comparator.internalName');
    let comparator = this.getComparator(filteredComparators, 'internalName', currentComparatorInternalName);
    
    if (!comparator) {
      let currentComparatorValueForQuery = this.get('filterRowObject.comparator.valueForQuery');
      comparator = this.getComparator(filteredComparators, 'valueForQuery', currentComparatorValueForQuery);
    }

    if (!comparator) {
      // defaults to undefined if you get the firstObject of an empty array
      comparator = filteredComparators.get('firstObject');
    }

    this.set('filterRowObject.comparator', comparator);
  })
});
