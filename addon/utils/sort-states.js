import EmberObject from '@ember/object';
import { A } from '@ember/array';

let sortState = EmberObject.extend({
  setNext(nextState) {
    this.set('nextState', nextState);
  },
  nextState: null,
  class: ''
});

export default EmberObject.extend({
  // eslint-disable-next-line
  states: {
    unsorted: sortState.create({ class: 'fa fa-sort text-muted' }),
    asc: sortState.create({ class: 'fa fa-sort-asc' }),
    desc: sortState.create({ class: 'fa fa-sort-desc' })
  },

  state: null,
  sortProperty: null,

  getSortArray() {
    let state = this.get('state');

    if (state === this.states.unsorted) {
      return A();
    }

    return A([
      EmberObject.create({
        column: this.sortProperty,
        asc: this.get('state') === this.states.asc
      })
    ]);
  },

  changeState(property) {
    let sortProperty = this.get('sortProperty');

    if (sortProperty != property) {
      this.set('sortProperty', property);
      this.set('state', this.states.unsorted);
    }

    this.set('state', this.get('state').nextState);

  },

  init() {
    this.states.unsorted.setNext(this.states.asc);
    this.states.asc.setNext(this.states.desc);
    this.states.desc.setNext(this.states.unsorted);

    this.set('state', this.states.unsorted);
  },
});
