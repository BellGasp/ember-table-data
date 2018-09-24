import Component from '@ember/component';
import layout from '../../templates/components/base/table-thead';
import { A } from '@ember/array';

export default Component.extend({

  layout,

  tagName: 'thead',

  init() {
    this._super(...arguments);
    this.set('properties', A());
  },

  notifySortObservers() {},

  actions: {
    updateSortParameters(sort) {
      let properties = this.get('properties');

      // Locate and remove the old sorted property with the same key.
      const old = properties.find(p => p.key === sort.key);
      properties.removeObject(old);

      // Add the new sorted property to the properties list.
      properties.pushObject(sort);

      // Ensure the properties are listed in the correct order by reversing the array.
      const reversed = properties.filter(p => p.direction !== 'unsorted').reverse();

      this.notifySortObservers(reversed);
    }
  }

});
