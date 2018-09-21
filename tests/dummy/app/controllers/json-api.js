import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

  store: service(),

  actions: {
    fetchRecords(query) {
      return this.store.query('character', query);
    }
  }

});
