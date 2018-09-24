import Component from '@ember/component';
import layout from '../../templates/components/base/table-cell';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({

  layout,

  tagName: 'td',
  colspan: 1,
  index: 0,
  sortProperty: null,
  sortStates: null,

  classNameBindings: ['sortProperty:clickable'],
  attributeBindings: ['colspan'],

  states: computed(function () {
    return A([
      { key: 'unsorted', class: 'fa-sort' },
      { key: 'ascending', class: 'fa-sort-asc' },
      { key: 'descending', class: 'fa-sort-desc' }
    ]);
  }),

  state: computed('index', 'states', function() {
    const { states, index } = this.getProperties(['states', 'index']);
    return states[index % states.length];
  }),

  notifySortChange() {},

  click() {
    this.incrementProperty('index');
    this.notifySortChange(this.get('state'));
  }

});
