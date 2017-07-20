import Ember from 'ember';
import layout from '../../templates/components/base/table-row';

const { computed } = Ember;

export default Ember.Component.extend({
  layout,
  isHeader: false,

  tagName: 'tr',
  cellsTagName: computed('isHeader', function () {
    return this.get('isHeader') ? 'th' : 'td';
  }),
});
