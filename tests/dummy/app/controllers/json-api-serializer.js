import Ember from 'ember';
import Filter from 'ember-table-data/utils/filter-object';
import Comparator from 'ember-table-data/utils/comparator-object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { computed } from '@ember/object';

export default Ember.Controller.extend({

  store: service(),

  properties: new A([
    Filter.create({ label: 'Name', propertyType: 'string', valueForQuery: 'name' }),
    Filter.create({ label: 'Age', propertyType: 'number', valueForQuery: 'age' }),
    Filter.create({ label: 'Evil', propertyType: 'boolean', valueForQuery: 'evil' })
  ]),

  comparators: computed(function() {
    return A([
      Comparator.create({ label: 'Equal', propertyType: 'string', valueForQuery: '(eq *)' }),
      Comparator.create({ label: 'Not Equal', propertyType: 'string', valueForQuery: '(neq *)' }),
      Comparator.create({ label: 'Contains', propertyType: 'string', valueForQuery: '(contains *)' }),
    ]);
  }),

  prepareQueryParams({ currentPage, pageSize, sorts = [], filters = [] }) {
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
  },

  actions: {
    fetchCharacters(query) {
      this.store.query('character', this.prepareQueryParams(query));
    }
  }

});
