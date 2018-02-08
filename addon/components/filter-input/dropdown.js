import Component from '@ember/component';
import layout from '../../templates/components/filter-input/dropdown';
import { assert } from '@ember/debug';
import { isArray } from '@ember/array';
import { get } from '@ember/object';

export default Component.extend({
  layout,
  data: null,
  options: null,

  valueChange: null,
  propertyPath: 'id',

  didReceiveAttrs() {
    this._super(...arguments);

    let data = this.get('data');

    if (!data) {
      assert('dropdown: the property "data" must be passed.');
    }

    if (typeof(data) !== 'function' && !isArray(data)) {
      assert('dropdown: the property "data" must be a function or an array.');
    }

    if (typeof(data) === 'function') {
      this.set('options', data());
    } else if (isArray(data)) {
      this.set('options', data);
    } else {
      assert('dropdown: the property "data" must be a function or an array.');
    }
  },

  actions: {
    valueChanged(value) {
      if (value === null) {
        return;
      }

      if (typeof(value) !== 'object') {
        this.get('valueChange')(value);
        return;
      }

      this.get('valueChange')(get(value, this.get('propertyPath')));    
    }
  }
});
