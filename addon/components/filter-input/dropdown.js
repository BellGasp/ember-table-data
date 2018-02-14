import Component from '@ember/component';
import layout from '../../templates/components/filter-input/dropdown';
import { assert } from '@ember/debug';
import { isArray } from '@ember/array';
import { getProperties, get } from '@ember/object';

export default Component.extend({
  layout,
  options: null,
  data: null,

  valueChange: null,
  propertyPath: 'id',
  labelPath: 'label',

  assertData() {
    let data = this.get('data');

    if (!data) {
      assert('dropdown: the property "data" must be passed.');
    }

    if (typeof(data) !== 'function' && !isArray(data)) {
      assert('dropdown: the property "data" must be a function or an array.');
    }
  },

  initDropdownProperties() {
    let {
      data,
      labelPath,
      propertyPath
    } = getProperties(this, 'data', 'labelPath', 'propertyPath');

    if (typeof(data) === 'function') {
      this.set('options', data());
    } else if (isArray(data)) {
      this.set('options', data);
    }

    if (labelPath) {
      this.set('labelPath', labelPath);
    }

    if (propertyPath) {
      this.set('propertyPath', propertyPath);
    }
  },

  init() {
    this._super(...arguments);
    this.assertData();
    this.initDropdownProperties();
  },

  actions: {
    customMatcher(value, search) {
      const labelPath = this.get('labelPath');

      if (typeof(value) === 'object' && value.hasOwnProperty(labelPath)) {
        let label = get(value, labelPath);
        return label.toString().toLowerCase().indexOf(search.toLowerCase());
      }

      return value.toString().toLowerCase().indexOf(search.toLowerCase());
    },
    valueChanged(value) {
      if (value === null) {
        return;
      }

      if (typeof(value) !== 'object') {
        this.get('valueChange')(value);
        return;
      }

      let propertyPath = this.get('propertyPath');

      if (!value.hasOwnProperty(propertyPath)) {
        assert('dropdown: the propertyPath must be a valid property of the object.');
      }

      this.get('valueChange')(get(value, propertyPath));
    }
  }
});
