import Controller from '@ember/controller';
import Filter from 'ember-table-data/utils/filter-object';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({

  store: service(),

  properties: computed(function() {
    return new A([
      new Filter({ label: 'Name', propertyType: 'string', valueForQuery: 'name' }),
      new Filter({ label: 'Age', propertyType: 'number', valueForQuery: 'age' }),
      new Filter({ label: 'Species', propertyType: 'string', valueForQuery: 'species' }),
    ]);
  }),

  actions: {

    fetchAnimals(query) {
      return this.store.query('animal', query);
    }

  }

});
