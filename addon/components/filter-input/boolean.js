import Component from '@ember/component';
import layout from '../../templates/components/filter-input/boolean';
import { observer } from '@ember/object';

export default Component.extend({
  layout,
  _selectedValue: null,

  didInsertElement() {
    this._super(...arguments);

    // Trigger initial set to make sure the filter as the value 'false' instead of null/undefined
    this.set('_selectedValue', false);
  },

  selectedValueObserver: observer('_selectedValue', function(){
    this.get('valueChange')(this.get('_selectedValue'));
  })
});
