import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { get, set } from '@ember/object';

let sortState = EmberObject.extend({
  setNext(nextState) {
    set(this, 'nextState', nextState);
  },
  nextState: null,
  class: ''
});

export default EmberObject.extend({
  states: {
    unsorted: sortState.create(),
    asc: sortState.create({ class: 'fa fa-sort-asc' }),
    desc: sortState.create({ class: 'fa fa-sort-desc' })
  },

  state: null,
  sortProperty: null,

  getSortArray() {
    let state = get(this, 'state');

    if (state === this.states.unsorted) {
      return A();
    }

    return A([
      EmberObject.create({
        column: this.sortProperty,
        asc: get(this, 'state') === this.states.asc
      })
    ]);
  },

  changeState(property) {
    let sortProperty = this.get('sortProperty');

    if (sortProperty != property) {
      set(this, 'sortProperty', property);
      set(this, 'state', this.states.unsorted);
    }

    set(this, 'state', get(this, 'state').nextState);

  },

  init() {
    this.states.unsorted.setNext(this.states.asc);
    this.states.asc.setNext(this.states.desc);
    this.states.desc.setNext(this.states.unsorted);

    set(this, 'state', this.states.unsorted);
  },
});
