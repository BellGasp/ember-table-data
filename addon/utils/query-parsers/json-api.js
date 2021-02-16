import EmberObject from '@ember/object';

export default EmberObject.extend({

  parse({ currentPage, pageSize, sorts = [], filters = [] }, useSimpleFilters = false) {
    const params = {};

    params['page[number]'] = currentPage;
    params['page[size]'] = pageSize;

    this._parseSorts(params, sorts);
    this._parseFilters(params, filters, useSimpleFilters);

    return params;
  },
  _parseFilters(params, filters, useSimpleFilters) {
    if (filters.length > 0) {
      if (useSimpleFilters) {
        this._parseSimpleFilters(params, filters);
      } else {
        this._parseComplexFilters(params, filters);
      }
    }
  },
  _parseComplexFilters(params, filters){
    params['filter'] = filters
      .map(
        ({ 
          value, 
          comparator: { valueForQuery: comparator }, 
          property: { valueForQuery: key } 
        }) => `${key} ${comparator} ${value}`)
      .join(' and ');
  },
  _parseSimpleFilters(params, filters){
    filters.forEach(
      ({
        value, 
        comparator: { valueForQuery: comparator }, 
        property: { valueForQuery: key } 
      }) => params[`filter[${key}]`] = `${comparator}:${value}`);
  },
  _parseSorts(params, sorts) {
    if (sorts.length > 0) {
      params['sort'] = sorts.map(s => s.direction === 'asc' ? s.key : `-${s.key}`).join(',');
    }
  }

});