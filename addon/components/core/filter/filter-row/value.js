import { getOwner } from '@ember/application';
import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../../../../templates/components/core/filter/filter-row/value';

export default Component.extend({
  layout,

  componentExist: computed('propertyType', function() {
    let componentName = `component:filter-input/${this.get('propertyType')}`;
    return getOwner(this).lookup(componentName);
  }),
});
