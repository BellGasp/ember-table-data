import { getOwner } from '@ember/application';
import Component from '@ember/component';
import layout from '../../../../templates/components/core/filter/filter-row/value';
import { computed } from '@ember/object';

export default Component.extend({
  layout,

  componentExist: computed('propertyType', function() {
    return getOwner(this).lookup(`component:filter-input/${this.get('propertyType')}`);
  }),
});
