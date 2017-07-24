import Ember from 'ember';

export default Ember.Object.extend({
  init(...args) {
    this._super(...args);
    this.set('records', new Ember.A());
  },
  page: 1,
  records: null
});
