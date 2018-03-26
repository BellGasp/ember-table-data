import Component from '@ember/component';
import layout from '../../templates/components/filter-input/string';

export default Component.extend({
  layout,

  init() {
    this._super(...arguments);
    let currentValue = this.get('filter.value');

    if(currentValue){
      this.set('_selectedValue', currentValue);
    }
  },

  actions:{
    inputChange(){
      this.get('valueChange')(this.get('_selectedValue'));
    }
  }
});
