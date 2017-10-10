import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../../templates/components/base/table-row';

export default Component.extend({
  layout,
  isHeader: false,

  tagName: 'tr',
  cellsTagName: computed('isHeader', function () {
    return this.get('isHeader') ? 'th' : 'td';
  }),
});
