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

    let sameLogicComparator = currentComparator
      ? this.get('filteredComparators')
        .findBy('internalName', currentComparator.get('internalName'))
      : false;

    if (sameLogicComparator) {
      this.set('filterRowObject.comparator', sameLogicComparator);
    } else {
      let firstComparator = this.get('filteredComparators.firstObject')
      if (firstComparator) {
        this.set('filterRowObject.comparator', firstComparator);
      } else {
        this.set('filterRowObject.comparator', null);
      }
    }
  })
});
