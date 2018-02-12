import { moduleForComponent, test } from 'ember-qunit';
import { selectChoose, clickTrigger } from 'ember-power-select/test-support/helpers'
import { Promise } from 'rsvp';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('filter-input/dropdown', 'Integration | Component | filter input/dropdown', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.set('data', ['test1', 'test2']);
  this.render(hbs`{{filter-input/dropdown data=data}}`);

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

  this.set('data', 53);

  assert.expectAssertion(() => {
    this.render(hbs`{{filter-input/dropdown data=data}}`);
  },
  /"data"/,
  'Throws assertion error if data is invalid')
});

test('the dropdown has the right options - array', async function(assert) {
  assert.expect(3);

  this.set('data', ['test1', 'test2']);

  this.render(hbs`{{filter-input/dropdown data=data}}`);
  await clickTrigger('div.dropdown');

  assert.equal(
    $('.ember-power-select-option').length,
    2,
    'There should be 2 options in the dropdown list.'
  );

  assert.equal(
    $('.ember-power-select-option:eq(0)').text().trim(),
    'test1',
    'The first option should be \"test1\".'
  );

  assert.equal(
    $('.ember-power-select-option:eq(1)').text().trim(),
    'test2',
    'The second option should be \"test2\".'
  );
});

test('the dropdown has the right options - array function', async function(assert) {
  assert.expect(3);

  this.set('data', function() {
    return ['test3', 'test4'];
  });

  this.render(hbs`{{filter-input/dropdown data=data}}`);
  await clickTrigger('div.dropdown');

  assert.equal(
    $('.ember-power-select-option').length,
    2,
    'There should be 2 options in the dropdown list.'
  );

  assert.equal(
    $('.ember-power-select-option:eq(0)').text().trim(),
    'test3',
    'The first option should be \"test3\".'
  );

  assert.equal(
    $('.ember-power-select-option:eq(1)').text().trim(),
    'test4',
    'The second option should be \"test4\".'
  );
});

test('the dropdown has the right options - promise function', async function(assert) {
  assert.expect(3);

  this.set('data', function() {
    return new Promise((resolve, reject) => {
      let value = ['test5', 'test6'];
      // on success
      resolve(value);

      // on failure
      reject('error');
    });
  });

  this.render(hbs`{{filter-input/dropdown data=data}}`);
  await clickTrigger('div.dropdown');

  assert.equal(
    $('.ember-power-select-option').length,
    2,
    'There should be 2 options in the dropdown list.'
  );

  assert.equal(
    $('.ember-power-select-option:eq(0)').text().trim(),
    'test5',
    'The first option should be \"test5\".'
  );

  assert.equal(
    $('.ember-power-select-option:eq(1)').text().trim(),
    'test6',
    'The second option should be \"test6\".'
  );
});

// test('the dropdown has the right options - promise error', function(assert) {
//
// });

test('the dropdown has the right options - empty', async function(assert) {
  assert.expect(2);

  this.set('data', []);
  this.render(hbs`{{filter-input/dropdown data=data}}`);

  await clickTrigger('div.dropdown');

  assert.equal(
    $('.ember-power-select-option').length,
    1,
    'There should be 1 option in the dropdown list.'
  );

  assert.equal(
    $('.ember-power-select-option:eq(0)').text().trim(),
    'No results found',
    'The only option should be \"No results found\".'
  );
});

test('selecting an option triggers valueChanged', async function(assert) {
  assert.expect(1);

  this.set('data', [
    'test1', 'test2'
  ]);

  this.set('externalAction', (actual) => {
    assert.equal(actual, 'test1', 'The value was sent to the action.');
  });

  this.render(hbs`{{filter-input/dropdown data=data valueChange=(action externalAction)}}`);

  await selectChoose('div.dropdown', '.ember-power-select-option', 0);
});

test('can select option using default property path', async function(assert) {
  assert.expect(1);

  this.set('data', [
    { id: 1, label: 'test1'},
    { id: 2, label: 'test2'},
  ]);

  this.set('externalAction', (actual) => {
    assert.equal(actual, 1, 'The value was sent to the action.');
  });

  this.render(hbs`{{filter-input/dropdown data=data valueChange=(action externalAction)}}`);

  await selectChoose('div.dropdown', '.ember-power-select-option', 0);
});

test('can select option using given property path', async function(assert) {
  assert.expect(1);

  this.set('data', [
    { id: 1, label: 'test1'},
    { id: 2, label: 'test2'},
  ]);

  this.set('externalAction', (actual) => {
    assert.equal(actual, 'test1', 'The value was sent to the action.');
  });

  this.render(hbs`
    {{filter-input/dropdown
      data=data
      valueChange=(action externalAction)
      propertyPath='label'
    }}`);

  await selectChoose('div.dropdown', '.ember-power-select-option', 0);
});

// expectAssertion does not currently support async
// test('can select option using given (undefined) property path', function(assert) {
//   assert.expect(1);
//
//   this.set('data', [
//     { id: 1, label: 'test1'},
//     { id: 2, label: 'test2'},
//   ]);
//
//   this.set('externalAction', () => {
//     assert.notOk(true, 'The test should not reach this assertion.');
//   });
//
//   this.render(hbs`
//     {{filter-input/dropdown
//       data=data
//       valueChange=(action externalAction)
//       propertyPath='pogchamp'
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

test('shows options with default label property', function(assert) {
  
});

test('shows options with given label property', function(assert) {

});

test('throws assertion if property path invalid', function(assert) {

});

test('throws assertion if label property path invalid', function(assert) {

});
