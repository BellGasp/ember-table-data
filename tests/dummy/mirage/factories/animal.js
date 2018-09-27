import { Factory, faker } from 'ember-cli-mirage';

const SPECIES = ['Cat', 'Dog', 'Bunny', 'Snake', 'Cow', 'Chicken', 'Horse'];

export default Factory.extend({

  name() {
    return faker.name.firstName();
  },

  age() {
    return Math.floor(Math.random() * Math.floor(20));
  },

  species(index) {
    return SPECIES[index % SPECIES.length];
  }

});