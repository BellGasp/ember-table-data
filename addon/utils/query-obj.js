import Ember from 'ember';

export default Ember.Object.extend({
  init(...args) {
    this._super(...args);
    this.set('sorts', new Ember.A());
    this.set('filters', new Ember.A());
  },
  currentPage: 1,
  pageSize: 10,
  sorts: null,
  filters: null,
  toQueryableObject(){
    return {
      filters: this.get('filters'),
      sorts: this.get('sorts'),
      currentPage: this.get('currentPage'),
      pageSize: this.get('pageSize')
    };
  }
});
