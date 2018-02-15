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

    if (filterRowObject && filteredComparators && filteredComparators.get('length') > 0) {
      set(filterRowObject, 'comparator', filteredComparators.get('firstObject'));
    }
  },

  resetComparator: observer('filteredComparators.@each.label', function() {
    let currentComparator = this.get('filterRowObject.comparator');

    if (currentComparator) {
      let internalName = currentComparator.get('internalName');
      
      var comparator = this.get('filteredComparators').findBy('internalName', internalName);
    }

    if (!comparator) {
      // defaults to undefined if you get the firstObject of an empty array
      comparator = this.get('filteredComparators.firstObject');
    }

    this.set('filterRowObject.comparator', comparator);
  })
});
