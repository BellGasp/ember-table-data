import EmberObject from '@ember/object';
import { A } from '@ember/array';

export default EmberObject.extend({
  init(...args) {
    this._super(...args);
    this.set('records', new A());
    this.set('lastUpdated', Date.now());
  },
  page: 1,
  records: null,
  lastUpdated: null,
  forceReload: false
});
