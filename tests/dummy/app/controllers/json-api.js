import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

  store: service(),

  actions: {
    fetchCharacters(query) {
      return this.store.query('character', query);
    }
  }

});
