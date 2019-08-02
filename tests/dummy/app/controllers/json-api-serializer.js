import Filter from 'ember-table-data/utils/filter-object';
import Comparator from 'ember-table-data/utils/comparator-object';
import JSONAPIQueryParser from 'ember-table-data/utils/query-parsers/json-api';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { next } from '@ember/runloop';

export default Controller.extend({

  store: service(),

  querySnapshot: null,
  properties: null,
  comparators: null,

  init() {
    this._super(...arguments);

    if (!this.get('querySnapshot')) {
      this.set('querySnapshot', {});
    }

    this.set('properties', A([
      Filter.create({ label: 'Name', propertyType: 'string', valueForQuery: 'name' }),
      Filter.create({ label: 'Age', propertyType: 'number', valueForQuery: 'age' }),
      Filter.create({ label: 'Evil', propertyType: 'boolean', valueForQuery: 'evil' })
    ]));

    this.set('comparators', A([
      Comparator.create({ label: 'Equal', propertyType: 'string', valueForQuery: 'eq' }),
      Comparator.create({ label: 'Not Equal', propertyType: 'string', valueForQuery: 'neq' }),
      Comparator.create({ label: 'Contains', propertyType: 'string', valueForQuery: 'contains' }),
    ]));
  },
  
  actions: {
    fetchCharacters(query) {
      const params = JSONAPIQueryParser.create().parse(query);

      next(this, () => this.set('querySnapshot', query));

      return this.store.query('character', params);
    }
  }

});
