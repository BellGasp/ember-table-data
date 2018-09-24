import Component from '@ember/component';
import layout from '../../templates/components/base/table-th';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({

  layout,

  index: 0,
  sort: '',

  tagName: 'th',

  classNameBindings: ['sort:clickable'],
  attributeBindings: ['colspan'],

  states: computed(function () {
    return A([
      { direction: 'unsorted', class: 'fa-sort' },
      { direction: 'asc', class: 'fa-sort-asc' },
      { direction: 'desc', class: 'fa-sort-desc' }
    ]);
  }),

  state: computed('index', 'states', function() {
    const { states, index } = this.getProperties(['states', 'index']);
    return states[index % states.length];
  }),

  notifyObservers() {},

  click() {
    this.incrementProperty('index');

    this.notifyObservers({
      key: this.get('sort'),
      direction: this.get('state.direction')
    });
  }

});
