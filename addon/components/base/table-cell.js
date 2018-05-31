import Component from '@ember/component';
import layout from '../../templates/components/base/table-cell';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  tagName: 'td',
  classNameBindings: ['sortProperty:clickable'],
  attributeBindings: ['colspan'],
  colspan: 1,

  isSorted: computed('sortProperty', 'sortStates.sortProperty', function () {
    return this.get('sortProperty') &&
      this.get('sortProperty') === this.get('sortStates.sortProperty');
  }),

  isHeader: computed('sortProperty', function () {
    return this.get('sortProperty');
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
