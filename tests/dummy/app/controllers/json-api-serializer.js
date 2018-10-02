import Filter from 'ember-table-data/utils/filter-object';
import Comparator from 'ember-table-data/utils/comparator-object';
import JSONAPIQueryParser from 'ember-table-data/utils/query-parsers/json-api';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { computed } from '@ember/object';

export default Controller.extend({

  store: service(),

  properties: computed(function() {
    return new A([
      new Filter({ label: 'Name', propertyType: 'string', valueForQuery: 'name' }),
      new Filter({ label: 'Age', propertyType: 'number', valueForQuery: 'age' }),
      new Filter({ label: 'Evil', propertyType: 'boolean', valueForQuery: 'evil' })
    ]);
  }),

  comparators: computed(function() {
    return A([
      new Comparator({ label: 'Equal', propertyType: 'string', valueForQuery: 'eq' }),
      new Comparator({ label: 'Not Equal', propertyType: 'string', valueForQuery: 'neq' }),
      new Comparator({ label: 'Contains', propertyType: 'string', valueForQuery: 'contains' }),
    ]);
  }),

  actions: {
    fetchCharacters(query) {
      const params = new JSONAPIQueryParser().parse(query);
      return this.store.query('character', params);
    }
  }

});
