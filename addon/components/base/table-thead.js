import Component from '@ember/component';
import layout from '../../templates/components/base/table-thead';
import { A } from '@ember/array';
import { computed } from '@ember/object';

export default Component.extend({

  layout,

  tagName: 'thead',

  sorts: null,

  init() {
    this._super(...arguments);

    const sorts = this.get('initialState.sorts');
    if (sorts) this.set('sorts', A(sorts));
  },

  filteredSorts: computed('sorts.[]', function() {
    return this.get('sorts').filter(p => p.direction !== 'unsorted');
  }),

  notifySortObservers() {},

  actions: {
    updateSortParameters(sort) {
      let sorts = this.get('sorts');

      // Locate and remove the old sort with the same key.
      const old = sorts.find(s => s.key === sort.key);
      sorts.removeObject(old);

      // Add the new sort to the sorts array.
      sorts.pushObject(sort);

      this.notifySortObservers(this.get('filteredSorts'));
    }
  }

});