import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import layout from '../../../templates/components/core/filter/filter-body';

export default Component.extend({
  layout,

  tableData: service(),

  availableComparators: computed('comparators.@each.{label,valueForQuery,propertyType,internalName}', function(){
    let defaults = this.get('tableData').defaultComparators();
    let comparators = this.get('comparators');

    return comparators && comparators.length > 0 ? comparators : defaults;
  })
});
