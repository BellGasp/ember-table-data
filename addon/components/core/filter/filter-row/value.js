import { getOwner } from '@ember/application';
import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import layout from '../../../../templates/components/core/filter/filter-row/value';
import { reads } from '@ember/object/computed';

export default Component.extend({
  layout,

  filter: null,
  propertyType: reads('filter.property.propertyType'),

  componentExist: computed('propertyType', function() {
    const componentName = `filter-input/${this.get('propertyType')}`;
    const owner = getOwner(this);
    const lookup = owner.lookup('component-lookup:main');
    if (!lookup.componentFor) {
      return !!lookup.lookupFactory(componentName);
    }
    return !!(lookup.componentFor(componentName, owner) || lookup.layoutFor(componentName, owner));
  }),
  resetValue: observer('showInput', function(){
    if (!this.get('showInput')){
      this.get('valueChange')();
    }
  })
});
