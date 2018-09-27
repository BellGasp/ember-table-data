import EmberObject from '@ember/object';

export default EmberObject.extend({

  parse({ currentPage, pageSize, sorts = [], filters = [] }) {
    const params = {};

    params['page[number]'] = currentPage;
    params['page[size]'] = pageSize;

    if (sorts.length > 0) {
      params['sort'] = sorts.map(s => s.asc === true ? s.column : `-${s.column}`).join(',');
    }

    if (filters.length > 0) {
      filters.forEach(({ value, comparator: { valueForQuery: comparator }, property: { valueForQuery: key } }) => {
        const param = comparator.replace('*', value);

        const current = params[`filter[${key}]`];
        params[`filter[${key}]`] = current ? current + param : param;
      });
    }

    return params;
  }

});