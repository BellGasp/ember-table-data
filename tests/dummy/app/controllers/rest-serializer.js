import Controller from '@ember/controller';
import { A } from '@ember/array';
import Filter from 'ember-table-data/utils/filter-object';
import { computed } from '@ember/object';

export default Controller.extend({

  properties: computed(function() {
    return new A([
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
