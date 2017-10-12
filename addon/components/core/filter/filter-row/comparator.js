import Component from '@ember/component';
import layout from '../../../../templates/components/core/filter/filter-row/comparator';

export default Component.extend({
  layout,

  init() {
    this._super(...arguments);

    if(this.get('filterRowObject') && this.get('filteredComparators') && this.get('filteredComparators.length') > 0){
      this.set('filterRowObject.comparator', this.get('filteredComparators.firstObject'));
    }
  },
});
