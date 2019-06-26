import Controller from '@ember/controller';
import Filter from 'ember-table-data/utils/filter-object';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({

  store: service(),

  properties: computed(function() {
    return A([
      Filter.create({ label: 'Name', propertyType: 'string', valueForQuery: 'name' }),
      Filter.create({ label: 'Age', propertyType: 'number', valueForQuery: 'age' }),
      Filter.create({ label: 'Species', propertyType: 'string', valueForQuery: 'species' }),
    ]);
  }),

  actions: {

    fetchAnimals(query) {
      return this.store.query('animal', query);
    }

  }

});
