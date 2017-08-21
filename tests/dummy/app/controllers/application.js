import Ember from 'ember';
import QueryObj from 'dummy/utils/query-obj';

export default Ember.Controller.extend({
  queryObj: null,

  init(...args) {
    this._super(args);
    this.set('queryObj', new QueryObj({
      currentPage: 1,
      totalCount: 50,
      pageSize: 5
    }));
  },

  actions: {
    changePage(page) {
      this.set('queryObj.currentPage', page);
    }
  }
});
