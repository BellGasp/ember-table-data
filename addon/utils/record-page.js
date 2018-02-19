import { A } from '@ember/array';
import EmberObject from '@ember/object';
import { set } from '@ember/object';

export default EmberObject.extend({
  init(...args) {
    this._super(...args);
    set(this, 'records', A([]));
    set(this, 'lastUpdated', Date.now());
  },
  page: 1,
  records: null,
  lastUpdated: null,
  forceReload: false
});
