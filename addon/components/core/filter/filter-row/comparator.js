import Component from '@ember/component';
import layout from '../../../../templates/components/core/filter/filter-row/comparator';
import { set } from '@ember/object';

export default Component.extend({
  layout,

  init() {
    this._super(...arguments);

    let filterRowObject = this.get('filterRowObject');
    let filteredComparators = this.get('filteredComparators');

    if(filterRowObject && filteredComparators && filteredComparators.get('length') > 0){
      set(filterRowObject, 'comparator', filteredComparators.get('firstObject'));
    }
  },
});
