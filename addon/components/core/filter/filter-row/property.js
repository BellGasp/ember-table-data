import Component from '@ember/component';
import layout from '../../../../templates/components/core/filter/filter-row/property';

export default Component.extend({
  layout,

  init() {
    this._super(...arguments);

    let filterRowObject = this.get('filterRowObject');
    let properties = this.get('properties');

    if (filterRowObject && properties && properties.get('length') > 0) {
      filterRowObject.set('property', properties.get('firstObject'));
    }
  },
});
