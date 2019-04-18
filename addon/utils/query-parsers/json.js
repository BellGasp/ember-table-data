import EmberObject from '@ember/object';

export default EmberObject.extend({

  parse({ currentPage, pageSize, sorts = [], filters = [] }) {
    const params = {};

    params['currentPage'] = currentPage;
    params['pageSize'] = pageSize;

    filters.forEach((filter, index) => {
      params[`Filters[${index}].FieldName`] = filter.get('property.valueForQuery');
      params[`Filters[${index}].FieldValue`] = filter.get('value');
      params[`Filters[${index}].FieldType`] = filter.get('property.propertyType');
      params[`Filters[${index}].Operator`] = filter.get('comparator.valueForQuery');
    });

    sorts.forEach((sort, index) => {
      params[`Sorts[${index}].Column`] = sort.get('column');
      params[`Sorts[${index}].Asc`] = sort.get('asc');
    });

    return params;
  }
});