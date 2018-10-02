import { A } from '@ember/array';
import EmberObject from '@ember/object';

export default EmberObject.extend({

  currentPage: 1,
  pageSize: 10,

  sorts: null,
  filters: null,

  init() {
    this._super(...arguments);

    if (!this.get('sorts')) {
      this.set('sorts', A());
    }

    if (!this.get('filters')) {
      this.set('filters', A());
    }
  },

});
