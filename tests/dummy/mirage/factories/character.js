import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({

  name() {
    return `${faker.name.firstName()} ${faker.name.lastName()}`;
  },

  age() {
    return Math.floor(Math.random() * Math.floor(95));
  },

  evil(index) {
    return index % 2 === 0;
  }

});