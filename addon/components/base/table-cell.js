import Component from '@ember/component';
import layout from '../../templates/components/base/table-cell';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  tagName: 'td',
  classNameBindings: ['sortProperty:clickable'],
  attributeBindings: ['colspan'],
  colspan: 1,

  sortState: computed('sortProperty', 'sortStates.{sortProperty,state}', function () {
    let sortProperty = this.get('sortProperty');
    let sortStates = this.get('sortStates');

    if (!sortProperty) return null;

    if (sortProperty === sortStates.get('sortProperty')) {
      return sortStates.get('state');
    }

    return sortStates.get('states.unsorted');
  }),

  sortProperty: null,
  sortStates: null,

  click() {
    let sortProperty = this.get('sortProperty');
    let updateSort = this.get('updateSort');
    if (sortProperty && updateSort) {
      updateSort(sortProperty);
    }
  },
});
