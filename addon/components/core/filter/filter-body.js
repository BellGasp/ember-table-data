import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import layout from '../../../templates/components/core/filter/filter-body';
import { A } from "@ember/array";

export default Component.extend({
  layout,

  tableData: service(),

  availableComparators: computed('comparators.@each.{label,valueForQuery,propertyType,internalName}', function(){
    let defaultComparators = this.get('tableData').defaultComparators();
    let userComparator = this.get('comparators');

    if(userComparator){
      userComparator.forEach(comp => {
        var defaultTypeComparators = A(defaultComparators.filterBy('propertyType', comp.get('propertyType')));
        if (defaultTypeComparators.length > 0){
          let sameComparator = defaultTypeComparators.findBy('internalName', comp.get('internalName'));
          if (sameComparator) {
            Object.assign(sameComparator, comp);
          } else {
            defaultComparators.pushObject(comp);
          }
        } else {
          defaultComparators.pushObject(comp);
        }
      });
    }

    return A(defaultComparators.filterBy('showComparator'));
  })
});
