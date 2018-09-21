import { moduleForComponent, test } from 'ember-qunit';
import { selectChoose, clickTrigger, typeInSearch } from 'ember-power-select/test-support/helpers';
import { Promise } from 'rsvp';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('filter-input/dropdown', 'Integration | Component | filter input/dropdown', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  let data = ['test1', 'test2'];
  this.set('filter', {
    property: {
      data
    }
  });
  this.render(hbs`{{filter-input/dropdown filter=filter}}`);

  assert.equal(this.$('div.dropdown').length, 1, 'Dropdown is showing.');
});

test('must pass data', function(assert) {
  assert.expect(1);

  assert.expectAssertion(
    () => {
      this.render(hbs`{{filter-input/dropdown}}`);
    },
    /"data"/,
    'Throws assertion error if data isn\'t passed'
  );
});

test('data must be valid', function(assert) {
  assert.expect(1);

  let data = 53;
  this.set('filter', {
    property: {
      data
    }
  });

  assert.expectAssertion(() => {
    this.render(hbs`{{filter-input/dropdown filter=filter}}`);
  },
  /"data"/,
  'Throws assertion error if data is invalid');
});

test('the dropdown has the right options - array', async function(assert) {
  assert.expect(3);

  let data = ['test1', 'test2'];
  this.set('filter', {
    property: {
      data
    }
  });

  this.render(hbs`{{filter-input/dropdown filter=filter}}`);
  await clickTrigger('div.dropdown');

  assert.dom('.ember-power-select-option').exists({ count: 2 });
  assert.dom('.ember-power-select-option:nth-of-type(1)').containsText('test1');
  assert.dom('.ember-power-select-option:nth-of-type(2)').containsText('test2');
});

test('the dropdown has the right options - array function', async function(assert) {
  assert.expect(3);

  let data = () => ['test3', 'test4'];
  this.set('filter', {
    property: {
      data
    }
  });

  this.render(hbs`{{filter-input/dropdown filter=filter}}`);
  await clickTrigger('div.dropdown');

  assert.dom('.ember-power-select-option').exists({ count: 2 });
  assert.dom('.ember-power-select-option:nth-of-type(1)').containsText('test3');
  assert.dom('.ember-power-select-option:nth-of-type(2)').containsText('test4');
});

test('the dropdown has the right options - promise function', async function(assert) {
  assert.expect(3);

  let data = () => new Promise((resolve, reject) => {
    let value = ['test5', 'test6'];
    // on success
    resolve(value);

    // on failure
    reject('error');
  });
  this.set('filter', {
    property: {
      data
    }
  });

  this.render(hbs`{{filter-input/dropdown filter=filter}}`);
  await clickTrigger('div.dropdown');

  assert.dom('.ember-power-select-option').exists({ count: 2 });
  assert.dom('.ember-power-select-option:nth-of-type(1)').containsText('test5');
  assert.dom('.ember-power-select-option:nth-of-type(2)').containsText('test6');
});

test('the dropdown has the right options - empty', async function(assert) {
  assert.expect(2);

  let data = [];
  this.set('filter', {
    property: {
      data
    }
  });

  this.render(hbs`{{filter-input/dropdown filter=filter}}`);

  await clickTrigger('div.dropdown');

  assert.dom('.ember-power-select-option').exists();
  assert.dom('.ember-power-select-option:nth-of-type(1)').containsText('No results found');
});

test('selecting an option triggers valueChanged', async function(assert) {
  assert.expect(1);

  let data = ['test1', 'test2'];
  this.set('filter', {
    property: {
      data
    }
  });

  this.set('externalAction', (actual) => {
    assert.equal(actual, 'test1', 'The value was sent to the action.');
  });

  this.render(hbs`{{filter-input/dropdown filter=filter valueChange=(action externalAction)}}`);

  await selectChoose('div.dropdown', '.ember-power-select-option', 0);
});

test('can select option using default property path', async function(assert) {
  assert.expect(1);

  let data = [
    { id: 1, label: 'test1' },
    { id: 2, label: 'test2' },
  ];
  this.set('filter', {
    property: {
      data
    }
  });

  this.set('externalAction', (actual) => {
    assert.equal(actual, 1, 'The value was sent to the action.');
  });

  this.render(hbs`{{filter-input/dropdown filter=filter valueChange=(action externalAction)}}`);

  await selectChoose('div.dropdown', '.ember-power-select-option', 0);
});

test('can select option using given property path', async function(assert) {
  assert.expect(1);

  let data = [
    { id: 1, label: 'test1' },
    { id: 2, label: 'test2' },
  ];
  this.set('filter', {
    property: {
      data,
      propertyPath: 'label'
    }
  });

  this.set('externalAction', (actual) => {
    assert.equal(actual, 'test1', 'The value was sent to the action.');
  });

  this.render(hbs` {{filter-input/dropdown filter=filter valueChange=(action externalAction) }}`);

  await selectChoose('div.dropdown', '.ember-power-select-option', 0);
});

test('shows options with default label property', async function(assert) {
  assert.expect(3);
  let data = [
    { id: 1, label: 'test1' },
    { id: 2, label: 'test2' },
  ];
  this.set('filter', {
    property: {
      data
    }
  });
  this.render(hbs`{{filter-input/dropdown filter=filter}}`);

  await clickTrigger('div.dropdown');

  assert.dom('.ember-power-select-option').exists({ count: 2 });
  assert.dom('.ember-power-select-option:nth-of-type(1)').containsText(data[0].label);
  assert.dom('.ember-power-select-option:nth-of-type(2)').containsText(data[1].label);
});

test('shows options with given label property', async function(assert) {
  assert.expect(3);
  var data = [
    { id: 1, label: 'test1', someProperty: 'some-name-1' },
    { id: 2, label: 'test2', someProperty: 'some-name-2' },
  ];

  this.set('filter', {
    property: {
      data,
      labelPath: 'someProperty'
    }
  });
  this.render(hbs`{{filter-input/dropdown filter=filter}}`);

  await clickTrigger('div.dropdown');

  assert.dom('.ember-power-select-option').exists({ count: 2 });
  assert.dom('.ember-power-select-option:nth-of-type(1)').containsText(data[0].someProperty);
  assert.dom('.ember-power-select-option:nth-of-type(2)').containsText(data[1].someProperty);
});

test('shows options with no label property', async function(assert) {
  assert.expect(3);
  var data = [
    { id: 1, someProperty: 'some-name-1', toString() { return 'object1'; } },
    { id: 2, someProperty: 'some-name-2', toString() { return 'object2'; } },
  ];

  this.set('filter', {
    property: {
      data,
      labelPath: 'label'
    }
  });
  this.render(hbs`{{filter-input/dropdown filter=filter}}`);

  await clickTrigger('div.dropdown');

  assert.dom('.ember-power-select-option').exists({ count: 2 });
  assert.dom('.ember-power-select-option:nth-of-type(1)').containsText(data[0]);
  assert.dom('.ember-power-select-option:nth-of-type(2)').containsText(data[1]);
});

test('can search based on label property - default label', async function(assert) {
  assert.expect(5);
  var data = [
    { id: 1, label: 'test1' },
    { id: 2, label: 'test2' },
  ];

  this.set('filter', {
    property: {
      data
    }
  });
  this.render(hbs`{{filter-input/dropdown filter=filter}}`);

  await clickTrigger('div.dropdown');

  assert.dom('.ember-power-select-option').exists({ count: 2 });
  assert.dom('.ember-power-select-option:nth-of-type(1)').containsText(data[0].label);
  assert.dom('.ember-power-select-option:nth-of-type(2)').containsText(data[1].label);

  await typeInSearch('test1');

  assert.dom('.ember-power-select-option').exists();
  assert.dom('.ember-power-select-option:nth-of-type(1)').containsText(data[0].label);
});

test('can search based on label property - given label', async function(assert) {
  assert.expect(5);
  var data = [
    { id: 1, someProperty: 'test1' },
    { id: 2, someProperty: 'test2' },
  ];

  this.set('filter', {
    property: {
      data,
      labelPath: 'someProperty'
    }
  });
  this.render(hbs`{{filter-input/dropdown filter=filter}}`);

  await clickTrigger('div.dropdown');

  assert.dom('.ember-power-select-option').exists({ count: 2 });
  assert.dom('.ember-power-select-option:nth-of-type(1)').containsText(data[0].someProperty);
  assert.dom('.ember-power-select-option:nth-of-type(2)').containsText(data[1].someProperty);

  await typeInSearch('test1');

  assert.dom('.ember-power-select-option').exists();
  assert.dom('.ember-power-select-option:nth-of-type(1)').containsText(data[0].someProperty);
});

test('can search based on label property - no label', async function(assert) {
  assert.expect(5);
  var data = [
    'test1',
    'test2',
  ];

  this.set('filter', {
    property: {
      data
    }
  });
  this.render(hbs`{{filter-input/dropdown filter=filter}}`);

  await clickTrigger('div.dropdown');

  assert.dom('.ember-power-select-option').exists({ count: 2 });
  assert.dom('.ember-power-select-option:nth-of-type(1)').containsText(data[0]);
  assert.dom('.ember-power-select-option:nth-of-type(2)').containsText(data[1]);

  await typeInSearch('test1');

  assert.dom('.ember-power-select-option').exists();
  assert.dom('.ember-power-select-option:nth-of-type(1)').containsText(data[0]);
});


// expectAssertion does not currently support async
// test('can select option using given (undefined) property path', function(assert) {
//   assert.expect(1);
//
  // let data = [
  //   { id: 1, label: 'test1'},
  //   { id: 2, label: 'test2'},
  // ];
  // this.set('filter', {
  //   property: {
      // data,
      // propertyPath: 'pogchamp'
  //   }
  // });
//   this.set('externalAction', () => {
//     assert.notOk(true, 'The test should not reach this assertion.');
//   });
//
//   this.render(hbs`
//     {{filter-input/dropdown
//       filter=filter
//       valueChange=(action externalAction)
//     }}`);
//
//   assert.expectAssertion(
//     async () => {
//       await selectChoose('div.dropdown', '.ember-power-select-option', 0);
//     },
//     /"data"/,
//     'Throws assertion error if data isn\'t passed'
//   );
// });

// test('throws assertion if property path invalid', function(assert) {
//
// });
//
// test('throws assertion if label property path invalid', function(assert) {
//
// });
