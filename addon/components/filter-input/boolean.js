import Component from '@ember/component';
import layout from '../../templates/components/filter-input/boolean';
import { observer } from '@ember/object';

export default Component.extend({
  layout,
  _selectedValue:false,

  selectedValueObserver: observer('_selectedValue', function(){
    this.get('valueChange')(this.get('_selectedValue'));
  })
});
