import Component from '@ember/component';
import layout from '../../../../templates/components/core/filter/filter-row/property';

export default Component.extend({
  layout,

  init() {
    this._super(...arguments);

    if (this.get('filterRowObject') && this.get('properties') && this.get('properties.length') > 0) {
      this.set('filterRowObject.property', this.get('properties.firstObject'));
    }
  },
});
