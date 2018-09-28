import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import layout from '../../../templates/components/core/filter/filter-body';
import { A } from '@ember/array';

export default Component.extend({
  layout,

  tableData: service(),

  availableComparators: computed('comparators.@each.{label,valueForQuery,propertyType,internalName}', function(){
    const defaults = this.get('tableData').defaultComparators();
    const comparators = this.get('comparators');

    const selection = comparators && comparators.length > 0 ? comparators : defaults;

    const filteredSelection = selection.filterBy('showComparator', true);

    return A(filteredSelection);
  })
});
