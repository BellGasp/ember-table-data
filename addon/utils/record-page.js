import { A } from '@ember/array';
import EmberObject from '@ember/object';

export default EmberObject.extend({
  init(...args) {
    this._super(...args);
    this.set('records', new A());
    this.set('lastUpdated', Date.now());
  },
  page: 1,
  records: null,
  lastUpdated: null
});
