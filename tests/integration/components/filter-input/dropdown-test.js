import { selectChoose, clickTrigger, typeInSearch } from 'ember-power-select/test-support/helpers';
import { Promise } from 'rsvp';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';
import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Component | filter-input/dropdown', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    let data = ['test1', 'test2'];
    this.set('filter', {
      property: {
        data
      }
    });
    await render(hbs`{{filter-input/dropdown filter=filter}}`);

    assert.equal(this.$('div.dropdown').length, 1, 'Dropdown is showing.');
  });

  test('the dropdown has the right options - array', async function(assert) {
    assert.expect(3);

    let data = ['test1', 'test2'];
    this.set('filter', {
      property: {
        data
      }
    });

    await render(hbs`{{filter-input/dropdown filter=filter}}`);

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

    await render(hbs`{{filter-input/dropdown filter=filter}}`);
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

    await render(hbs`{{filter-input/dropdown filter=filter}}`);
    await clickTrigger('div.dropdown');

    assert.dom('.ember-power-select-option').exists({ count: 2 });
    assert.dom('.ember-power-select-option:nth-of-type(1)').containsText('test5');
    assert.dom('.ember-power-select-option:nth-of-type(2)').containsText('test6');
  });

  // test('the dropdown has the right options - promise error', async function(assert) {
  //
  // });

  test('the dropdown has the right options - empty', async function(assert) {
    assert.expect(2);

    let data = [];
    this.set('filter', {
      property: {
        data
      }
    });

    await render(hbs`{{filter-input/dropdown filter=filter}}`);

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

    await render(hbs`{{filter-input/dropdown filter=filter valueChange=(action externalAction)}}`);

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

    await render(hbs`{{filter-input/dropdown filter=filter valueChange=(action externalAction)}}`);

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

    await render(hbs` {{filter-input/dropdown filter=filter valueChange=(action externalAction) }}`);

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
    await render(hbs`{{filter-input/dropdown filter=filter}}`);

    await clickTrigger('div.dropdown');

    assert.dom('.ember-power-select-option').exists({ count: 2 });
    assert.dom('.ember-power-select-option:nth-of-type(1)').containsText('test1');
    assert.dom('.ember-power-select-option:nth-of-type(2)').containsText('test2');
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
    await render(hbs`{{filter-input/dropdown filter=filter}}`);

    await clickTrigger('div.dropdown');

    assert.dom('.ember-power-select-option').exists({ count: 2 });
    assert.dom('.ember-power-select-option:nth-of-type(1)').containsText('some-name-1');
    assert.dom('.ember-power-select-option:nth-of-type(2)').containsText('some-name-2');
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
    await render(hbs`{{filter-input/dropdown filter=filter}}`);

    await clickTrigger('div.dropdown');

    assert.dom('.ember-power-select-option').exists({ count: 2 });
    assert.dom('.ember-power-select-option:nth-of-type(1)').containsText('object1');
    assert.dom('.ember-power-select-option:nth-of-type(2)').containsText('object2');
  });

  // Skipping because it has never been possible to search in the dropdown.
  // It would be a good idea to re-enable this test if it is implemented at some point.
  skip('can search based on label property - default label', async function(assert) {
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
    await render(hbs`{{filter-input/dropdown filter=filter}}`);

    await clickTrigger('div.dropdown');

    assert.dom('.ember-power-select-option').exists({ count: 2 });
    assert.dom('.ember-power-select-option:nth-of-type(1)').containsText('test1');
    assert.dom('.ember-power-select-option:nth-of-type(2)').containsText('test2');

    await typeInSearch('test1');

    assert.dom('.ember-power-select-option').exists();
    assert.dom('.ember-power-select-option:nth-of-type(1)').containsText('test1');
  });

  // Skipping because it has never been possible to search in the dropdown.
  // It would be a good idea to re-enable this test if it is implemented at some point.
  skip('can search based on label property - given label', async function(assert) {
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
    await render(hbs`{{filter-input/dropdown filter=filter}}`);

    await clickTrigger('div.dropdown');

    assert.dom('.ember-power-select-option').exists({ count: 2 });
    assert.dom('.ember-power-select-option:nth-of-type(1)').containsText('test1');
    assert.dom('.ember-power-select-option:nth-of-type(2)').containsText('test2');

    await typeInSearch('test1');

    assert.dom('.ember-power-select-option').exists();
    assert.dom('.ember-power-select-option:nth-of-type(1)').containsText('test1');
  });

  // Skipping because it has never been possible to search in the dropdown.
  // It would be a good idea to re-enable this test if it is implemented at some point.
  skip('can search based on label property - no label', async function(assert) {
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
    await render(hbs`{{filter-input/dropdown filter=filter}}`);

    await clickTrigger('div.dropdown');

    assert.dom('.ember-power-select-option').exists({ count: 2 });
    assert.dom('.ember-power-select-option:nth-of-type(1)').containsText('test1');
    assert.dom('.ember-power-select-option:nth-of-type(2)').containsText('test2');

    await typeInSearch('test1');

    assert.dom('.ember-power-select-option').exists();
    assert.dom('.ember-power-select-option:nth-of-type(1)').containsText('test1');
  });
});
