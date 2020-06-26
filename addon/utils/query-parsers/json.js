import EmberObject, { get } from '@ember/object';

export default EmberObject.extend({

  parse({ currentPage, pageSize, sorts = [], filters = [] }) {
    const params = {};

    params['currentPage'] = currentPage;
    params['pageSize'] = pageSize;

    filters.forEach((filter, index) => {
      params[`Filters[${index}].FieldName`] = get(filter, 'property.valueForQuery');
      params[`Filters[${index}].FieldValue`] = get(filter, 'value');
      params[`Filters[${index}].FieldType`] = get(filter, 'property.propertyType');
      params[`Filters[${index}].Operator`] = get(filter, 'comparator.valueForQuery');
    });

    sorts.forEach((sort, index) => {
      // key/direction used in ember-table-data and JSON-API backends
      // Column/Asc used in IdentityServer and JSON backends (TableDataVm)

      params[`Sorts[${index}].Column`] = get(sort, 'key');
      params[`Sorts[${index}].Asc`] = get(sort, 'direction').toLowerCase() === 'asc';
    });

    return params;
  }
});