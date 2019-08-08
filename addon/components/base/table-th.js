import Component from '@ember/component';
import layout from '../../templates/components/base/table-th';
import EmberObject, { computed } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({

  layout,

  index: 0,
  sort: '',
  sorts: null,

  tagName: 'th',

  init() {
    this._super(...arguments);

    if (!this.sorts) {
        this.set('sorts', A());
    }

    const match = this.sorts.find(s => s.key === this.sort);

    if (match) {
      const state = this.states.find(s => s.direction === match.direction);
      const index = this.states.indexOf(state);

      this.set('index', index);
    }
  },

  classNameBindings: ['sort:clickable'],
  attributeBindings: ['colspan'],

  states: computed(function () {
    return A([
      EmberObject.create({ direction: 'unsorted', class: '▼▲' }),
      EmberObject.create({ direction: 'asc', class: '▲' }),
      EmberObject.create({ direction: 'desc', class: '▼' }),
    ]);
  }),

  state: computed('index', 'states', function() {
    const { states, index } = this.getProperties(['states', 'index']);
    return states[index % states.get('length')];
  }),

  sortOrder: computed('sort', 'sorts.[]', function () {
    const sort = this.get('sort');
    const sorts = this.get('sorts') || A();
    const match = sorts.find(s => s.key === sort);

    return sorts.indexOf(match) + 1;
  }),

  notifyObservers() {},

  click() {
    const sort = this.get('sort');

    if (sort) {
      this.incrementProperty('index');

      this.notifyObservers({
        key: sort,
        direction: this.get('state.direction')
      });
    }
  }

});
