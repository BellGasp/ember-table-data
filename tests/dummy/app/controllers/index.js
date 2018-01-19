import Controller from '@ember/controller';
import Filter from 'ember-table-data/utils/filter-object';
import { A } from '@ember/array';

export default Controller.extend({
  properties: new A([
    Filter.create({
      label: 'First Name',
      propertyType: 'string',
      valueForQuery: 'FirstName'
    }),

    Filter.create({
      label: 'Last Name',
      propertyType: 'string',
      valueForQuery: 'LastName'
    })
  ]),

  actions: {
    getRecords(queryObj) {
      return this.get('store').query('person', queryObj);
    },

    changePage(page) {
      this.set('queryObj.currentPage', page);
    }
  }
});
