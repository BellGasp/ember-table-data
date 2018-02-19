import { A } from '@ember/array';
import EmberObject from '@ember/object';
import { get, set, getProperties } from '@ember/object';
import { classify } from '@ember/string';

export default EmberObject.extend({
  init(...args) {
    this._super(...args);

    if (!get(this, 'sorts')) {
      set(this, 'sorts', A());
    }
    if (!get(this, 'filters')) {
      set(this, 'filters', A());
    }
  },

  currentPage: 1,
  pageSize: 10,
  sorts: null,
  filters: null,

  toQueryableObject() {
    return getProperties(this, 'filters', 'sorts', 'currentPage', 'pageSize');
  },

  toSerializableObject() {
    let serializedObj = getProperties(this, 'currentPage', 'pageSize');

    get(this, 'filters').forEach((filter, index) => {
      let comparatorInternalName = classify(get(filter, 'comparator.internalName'));
      let type = get(filter, 'property.propertyType');

      serializedObj[`Filters[${index}].FieldName`] =
        get(filter, `property.valueFor${comparatorInternalName}`) ||
        get(filter, 'property.valueForQuery');

      serializedObj[`Filters[${index}].ColumnWrapper`] =
        get(filter, `property.columnWrapperFor${comparatorInternalName}`) ||
        get(filter, 'property.columnWrapperForQuery');

      serializedObj[`Filters[${index}].FieldValue`] = get(filter, 'value');
      serializedObj[`Filters[${index}].Operator`] = get(filter, 'comparator.valueForQuery');
      serializedObj[`Filters[${index}].FieldType`] = type === 'number'
        ? 'int'
        : type === 'date'
          ? 'datetime'
          : type;
    });

    get(this, 'sorts').forEach((sort, index) => {
      serializedObj[`Sorts[${index}].Column`] = get(sort, 'column');
      serializedObj[`Sorts[${index}].Asc`] = get(sort, 'asc');
    });

    return serializedObj;
  }
});
