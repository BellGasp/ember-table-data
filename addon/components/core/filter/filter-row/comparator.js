import Component from '@ember/component';
import layout from '../../../../templates/components/core/filter/filter-row/comparator';

export default Component.extend({
  layout,

  init() {
    this._super(...arguments);

    let filterRowObject = this.get('filterRowObject');
    let filteredComparators = this.get('filteredComparators');

    if(filterRowObject && filteredComparators && filteredComparators.get('length') > 0){
      filterRowObject.set('comparator', filteredComparators.get('firstObject'));
    }
  },
});
