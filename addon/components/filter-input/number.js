import Component from '@ember/component';
import layout from '../../templates/components/filter-input/number';

export default Component.extend({
  layout,

  actions:{
    inputChange(){
      this.get('valueChange')(this.get('_selectedValue'));
    }
  }
});
