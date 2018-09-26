import Ember from 'ember';
import { inject as service } from '@ember/service';

export default Ember.Controller.extend({

  store: service(),

  actions: {
    fetchCharacters(query) {
      console.log(query)
      this.store.query('character', query);
    }
  }

});
