import Component from '@ember/component';
import layout from '../../templates/components/base/table-cell';

export default Component.extend({

  layout,

  tagName: 'td',
  attributeBindings: ['colspan'],
  colspan: 1,

});
