import { A } from '@ember/array';
import EmberObject from '@ember/object';

export default EmberObject.extend({
  init(...args) {
    this._super(...args);
    
    if (!this.get('sorts')) {
      this.set('sorts', new A());
    }
    if (!this.get('filters')) {
      this.set('filters', new A());
    }
  },
  currentPage: 1,
  pageSize: 10,
  sorts: null,
  filters: null,
  toQueryableObject() {
    return {
      filters: this.get('filters'),
      sorts: this.get('sorts'),
      currentPage: this.get('currentPage'),
      pageSize: this.get('pageSize')
    };
  },
  toSerializableObject(){
    let serializedObj = {
      currentPage: this.get('currentPage'),
      pageSize: this.get('pageSize')
    };

    this.get('filters').forEach((filter, index) => {
      serializedObj[`Filters[${index}].FieldName`] = filter.get('property.valueForQuery');
      serializedObj[`Filters[${index}].FieldValue`] = filter.get('value');
      serializedObj[`Filters[${index}].FieldType`] = filter.get('property.propertyType');
      serializedObj[`Filters[${index}].Operator`] = filter.get('comparator.valueForQuery');
    });

    this.get('sorts').forEach((sort, index) => {
      serializedObj[`Sorts[${index}].Column`] = sort.get('column');
      serializedObj[`Sorts[${index}].Asc`] = sort.get('asc');
    });

    return serializedObj;
  }
});
