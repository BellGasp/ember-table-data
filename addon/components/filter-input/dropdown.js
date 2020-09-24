import Component from '@ember/component';
import layout from '../../templates/components/filter-input/dropdown';
import { assert } from '@ember/debug';
import { isArray } from '@ember/array';
import { computed, observer, getProperties, get } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Component.extend({
  layout,
  data: null,

  valueChange: null,
  propertyPath: 'id',
  labelPath: 'label',

  options: alias('filter.property.data'),

  assertData() {
    let options = this.get('options');
    
    if (!options) {
      assert('dropdown: the property "data" must be passed.');
    }

    if (typeof (options) !== 'function' && !isArray(options)) {
      assert('dropdown: the property "data" must be a function or an array.');
    }
  },

  initDropdownProperties() {
    let {
      labelPath,
      propertyPath
    } = getProperties(this.get('filter.property'), 'labelPath', 'propertyPath');

    if (labelPath) {
      this.set('labelPath', labelPath);
    }

    if (propertyPath) {
      this.set('propertyPath', propertyPath);
    }
    
    let selectedValue = this.get('filter.value');
    if(selectedValue){
      this.set('selectedValue', selectedValue);
    }
  },

  /* eslint-disable ember/no-observers */
  resetSelectionOnOptionsChange: observer('options', function() {
    this.set('selectedValue', null);
    this.send('valueChanged', null);
  }),
  /* eslint-enable ember/no-observers */

  sortedOptions: computed('options', 'options.[]', function() {
    let options = this.get('options');

    let optionResults = typeof options === 'function'
      ? options()
      : options;

    let labelPath = this.get('labelPath');
    return labelPath 
      ? optionResults.sortBy(labelPath)
      : optionResults.sort();
  }),

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

      this.set('selectedValue', value);

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
