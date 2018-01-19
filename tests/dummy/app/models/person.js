import DS from 'ember-data';
import { computed } from '@ember/object';

const { Model, attr } = DS;

export default Model.extend({
  firstName: attr(),
  lastName: attr(),
  avatar: attr(),

  fullName: computed('firstName', 'lastName', function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }),
});
