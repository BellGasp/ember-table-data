import SortStates from 'dummy/utils/sort-states';
import { module, test } from 'qunit';

module('Unit | Utility | Sort States');

test('it inits as unsorted', function(assert) {
  let sortStates = SortStates.create();
  assert.equal(sortStates.state, sortStates.states.unsorted);
});

test('Unsorted state the right class/next state', function(assert) {
  let sortStates = SortStates.create();

  assert.equal(sortStates.states.unsorted.class, '');
  assert.equal(sortStates.states.unsorted.nextState, sortStates.states.asc);
});

test('Asc state the right class/next state', function(assert) {
  let sortStates = SortStates.create();

  assert.equal(sortStates.states.asc.class, 'fa fa-sort-asc');
  assert.equal(sortStates.states.asc.nextState, sortStates.states.desc);
});

test('Desc state the right class/next state', function(assert) {
  let sortStates = SortStates.create();

  assert.equal(sortStates.states.desc.class, 'fa fa-sort-desc');
  assert.equal(sortStates.states.desc.nextState, sortStates.states.unsorted);
});

test('Changing state follows the right order', function(assert) {
  let sortStates = SortStates.create();
  assert.equal(sortStates.state, sortStates.states.unsorted);

  sortStates.changeState('some-property');
  assert.equal(sortStates.state, sortStates.states.asc);

  sortStates.changeState('some-property');
  assert.equal(sortStates.state, sortStates.states.desc);

  sortStates.changeState('some-property');
  assert.equal(sortStates.state, sortStates.states.unsorted);
});

test('Changing state on a different property resets the state to asc', function(assert) {
  let sortStates = SortStates.create();
  assert.equal(sortStates.state, sortStates.states.unsorted);

  sortStates.changeState('some-property');
  assert.equal(sortStates.state, sortStates.states.asc);

  sortStates.changeState('some-property');
  assert.equal(sortStates.state, sortStates.states.desc);

  sortStates.changeState('some-other-property');
  assert.equal(sortStates.state, sortStates.states.asc);

  sortStates.changeState('some-other2-property');
  assert.equal(sortStates.state, sortStates.states.asc);
});

test('getSortArray returns empty array for unsorted', function(assert) {
  let sortStates = SortStates.create();
  assert.equal(sortStates.state, sortStates.states.unsorted);

  sortStates.changeState('some-property');
  assert.equal(sortStates.state, sortStates.states.asc);

  sortStates.changeState('some-property');
  assert.equal(sortStates.state, sortStates.states.desc);

  sortStates.changeState('some-property');
  assert.equal(sortStates.state, sortStates.states.unsorted);

  let sortArray = sortStates.getSortArray();
  assert.equal(sortArray.length, 0);
});

test('getSortArray returns the right column/asc', function(assert) {
  let sortStates = SortStates.create();
  assert.equal(sortStates.state, sortStates.states.unsorted);

  sortStates.changeState('some-property');
  assert.equal(sortStates.state, sortStates.states.asc);

  sortStates.changeState('some-property');
  assert.equal(sortStates.state, sortStates.states.desc);

  let sortArray = sortStates.getSortArray();
  assert.equal(sortArray.length, 1);
  assert.equal(sortArray.get('firstObject.column'), 'some-property');
  assert.equal(sortArray.get('firstObject.asc'), false);

  sortStates.changeState('some-other-property');
  assert.equal(sortStates.state, sortStates.states.asc);

  sortArray = sortStates.getSortArray();
  assert.equal(sortArray.length, 1);
  assert.equal(sortArray.get('firstObject.column'), 'some-other-property');
  assert.equal(sortArray.get('firstObject.asc'), true);
});
