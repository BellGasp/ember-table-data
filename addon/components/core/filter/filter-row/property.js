import Component from '@ember/component';
import layout from '../../../../templates/components/core/filter/filter-row/property';
import { set } from '@ember/object';

export default Component.extend({
  layout,

  init() {
    this._super(...arguments);

    let filterRowObject = this.get('filterRowObject');
    let properties = this.get('properties');

    if (filterRowObject && !filterRowObject.property && properties && properties.get('length') > 0) {
      set(filterRowObject, 'property', properties.get('firstObject'));
    }
  },

  actions: {
    updateSelectedProperty(mutAction, filterRowObject, property) {
      mutAction(property);
      filterRowObject.set('value', null);
    }
  }
});
