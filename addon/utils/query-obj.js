import { A } from '@ember/array';
import EmberObject from '@ember/object';

export default EmberObject.extend({
  init(...args) {
    this._super(...args);
    this.set('sorts', new A());
    this.set('filters', new A());
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
