import Controller from '@ember/controller';
import Filter from 'ember-table-data/utils/filter-object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default Controller.extend({

  store: service(),

  properties: null,

  init() {
    this._super(...arguments);

    this.set('properties', A([
      Filter.create({ label: 'Name', propertyType: 'string', valueForQuery: 'name' }),
      Filter.create({ label: 'Age', propertyType: 'number', valueForQuery: 'age' }),
      Filter.create({ label: 'Species', propertyType: 'string', valueForQuery: 'species' }),
    ]));
  },

  actions: {

    fetchAnimals(query) {
      return this.store.query('animal', query);
    }

  }

});
