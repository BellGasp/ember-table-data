import EmberObject from '@ember/object';

export default EmberObject.extend({

  parse({ currentPage, pageSize, sorts = [], filters = [] }) {
    const params = {};

    params['page[number]'] = currentPage;
    params['page[size]'] = pageSize;

    if (sorts.length > 0) {
      params['sort'] = sorts.map(s => s.direction === 'asc' ? s.key : `-${s.key}`).join(',');
    }

    if (filters.length > 0) {
      params['filter'] = filters.map(({ value, comparator: { valueForQuery: comparator }, property: { valueForQuery: key } }) => {
        return `${key} ${comparator} ${value}`;
      }).join(' and ');
    }

    return params;
  }

});