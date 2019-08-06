import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';
import Comparator from 'ember-table-data/utils/comparator-object';
import Filter from 'ember-table-data/utils/filter-object';
import { isOptionInList } from '../../../../helpers/ember-power-select-custom-helpers';
import { A } from '@ember/array';
import { render } from '@ember/test-helpers';
import { selectChoose } from 'ember-power-select/test-support/helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Component | core/filter/filter-body', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders without errors when nothing is passed', async function(assert) {
    assert.expect(1);

    await render(hbs `{{core/filter/filter-body}}`);

    assert.dom('').containsText('');
  });

  test('it filters comparator using `showComparator`', async function(assert) {
    assert.expect(2);

    this.setProperties({
      deleteRow: () => {},
      filtersRows: A([
        EmberObject.create({ property: Filter.create({ propertyType: 'string' }) })
      ]),
      comparators: A([
        Comparator.create({
          label: 'Is Empty',
          showComparator: false,
          propertyType: 'string',
          internalName: 'isEmpty'
        })
      ])
    });

    await render(hbs`
      {{#core/filter/filter-body filtersRows=filtersRows comparators=comparators as |body|}}
        {{#body.row deleteRow=deleteRow class="row pb-1" as |row|}}
          {{row.comparator}}
        {{/body.row}}
      {{/core/filter/filter-body}}
    `);

    let isComparatorVisible = await isOptionInList('.comparator-selector', 'Is Empty');

    assert.ok(!isComparatorVisible);

    this.set('comparators', A([
      Comparator.create({
        label: 'Is Empty',
        showComparator: true,
        propertyType: 'string',
        internalName: 'isEmpty'
      })
    ]));

    isComparatorVisible = await isOptionInList('.comparator-selector', 'Is Empty');
    assert.ok(isComparatorVisible);
  });

  test('it hides the input when `showInput` is false', async function(assert) {
    assert.expect(2);

    this.set('deleteRow', () => {});
    this.set('filtersRows', A([
        EmberObject.create({ property: Filter.create({ propertyType: 'string' }) })
    ]));

    await render(hbs`
      {{#core/filter/filter-body filtersRows=filtersRows as |body|}}
        {{#body.row deleteRow=deleteRow class="row pb-1" as |row|}}
          {{row.comparator}}
          {{row.value}}
        {{/body.row}}
      {{/core/filter/filter-body}}
    `);

    assert.dom('.inputValue').exists();

    await selectChoose('.comparator-selector', 'Is Empty');

    assert.dom('.inputValue').doesNotExist();
  });

  test('it adds comparator when propertyType does not exist', async function(assert) {
    assert.expect(1);

    this.set('deleteRow', () => {});
    this.set('filtersRows',
      A([
        EmberObject.create({
          property: Filter.create({
            propertyType: 'stringCUSTOM',
            label:'Custom String'
          })
        })
      ])
    );

    this.set('comparators', A([
      Comparator.create({
        propertyType: 'stringCUSTOM',
        internalName: 'isEmpty',
        label:'Custom'
      })
    ]));

    await render(hbs`
      {{#core/filter/filter-body filtersRows=filtersRows comparators=comparators as |body|}}
        {{#body.row deleteRow=deleteRow class="row pb-1" as |row|}}
          {{row.property}}
          {{row.comparator}}
          {{row.value}}
        {{/body.row}}
      {{/core/filter/filter-body}}
    `);

    let doesComparatorExist = await isOptionInList('.comparator-selector', 'Custom');

    assert.ok(doesComparatorExist);
  });

  test('it adds comparator when propertyType exists', async function(assert) {
    assert.expect(1);

    this.set('deleteRow', () => {});
    this.set('filtersRows',
      A([
        EmberObject.create({
          property: Filter.create({
            propertyType: 'string',
            label:'Custom String'
          })
        })
      ])
    );

    this.set('comparators', A([
      Comparator.create({
        propertyType: 'string',
        internalName: 'custom',
        label:'Custom'
      })
    ]));

    await render(hbs`
      {{#core/filter/filter-body filtersRows=filtersRows comparators=comparators as |body|}}
        {{#body.row deleteRow=deleteRow class="row pb-1" as |row|}}
          {{row.property}}
          {{row.comparator}}
          {{row.value}}
        {{/body.row}}
      {{/core/filter/filter-body}}
    `);

    let doesComparatorExist = await isOptionInList('.comparator-selector', 'Custom');

    assert.ok(doesComparatorExist);
  });
});
