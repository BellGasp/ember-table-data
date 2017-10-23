/* global $ */
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { A } from '@ember/array';
import EmberObject from '@ember/object';
import { clickTrigger, typeInSearch, selectChoose } from 'dummy/tests/helpers/ember-power-select'
import comparatorObject from 'ember-table-data/utils/comparator-object'
import filterObject from 'ember-table-data/utils/filter-object';



moduleForComponent('core/filter/filter-body', 'Integration | Component | core/filter/filter body', {
  integration: true,
  need: ['service:table-data']
});

test('it renders with out error if nothing is pass', function(assert) {
  this.render(hbs `{{core/filter/filter-body}}`);

  assert.equal(this.$().text().trim(), '', 'Theres no default layout to the component. ' +
    'Should be empty if you dont use yeld component');
});

test('it filter comparator when using the showComparator boolean', function(assert) {
  this.set('deleteRow', () => {});
  this.set('filtersRows',
    new A([
      EmberObject.create({
        property: filterObject.create({
          propertyType: 'string'
        })
      })
    ])
  );
  this.set('comparators', new A([
    comparatorObject.create({
      showComparator: false,
      propertyType: 'string',
      internalName: 'isEmpty'
    })
  ]));

  this.render(hbs `
    {{#core/filter/filter-body filtersRows=filtersRows comparators=comparators as |body|}}
      {{#body.row deleteRow=deleteRow class="row pb-1" as |row|}}
        {{row.comparator}}
      {{/body.row}}
    {{/core/filter/filter-body}}`);

  clickTrigger(".comparator-selector");
  typeInSearch("is Emp");
  assert.equal($('.ember-power-select-option--no-matches-message').length, 1,
    'The no match found message is shown');
  clickTrigger(".comparator-selector");

  this.set('comparators', new A([
    comparatorObject.create({
      showComparator: true,
      propertyType: 'string',
      internalName: 'isEmpty'
    })
  ]));

  clickTrigger(".comparator-selector");
  typeInSearch("is Emp");
  assert.equal($('.ember-power-select-option').length, 1, 'The is Empty options is present');
  assert.equal($('.ember-power-select-option--no-matches-message').length, 0,
    'The no match found message is not shown');
});

test('it hide input when showInput is false', function(assert) {
  this.set('deleteRow', () => {});
  this.set('filtersRows',
    new A([
      EmberObject.create({
        property: filterObject.create({
          propertyType: 'string'
        })
      })
    ])
  );
  this.render(hbs `
    {{#core/filter/filter-body filtersRows=filtersRows as |body|}}
      {{#body.row deleteRow=deleteRow class="row pb-1" as |row|}}
        {{row.comparator}}
        {{row.value}}
      {{/body.row}}
    {{/core/filter/filter-body}}`);


  assert.equal(this.$('.inputValue').length, 1, 'The input is shown');
  clickTrigger(".comparator-selector");
  selectChoose('.comparator-selector', 'Is Empty');
  assert.equal(this.$('.inputValue').length, 0, 'The input is not shown by default with is Empty comparator');
});

test('it add comparator when propertyType does not exist', function(assert) {
  this.set('deleteRow', () => {});
  this.set('filtersRows',
    new A([
      EmberObject.create({
        property: filterObject.create({
          propertyType: 'stringCUSTOM',
          label:'Custom String'
        })
      })
    ])
  );

  this.set('comparators', new A([
    comparatorObject.create({
      propertyType: 'stringCUSTOM',
      internalName: 'isEmpty',
      label:'Custom'
    })
  ]));

  this.render(hbs `
    {{#core/filter/filter-body filtersRows=filtersRows comparators=comparators as |body|}}
      {{#body.row deleteRow=deleteRow class="row pb-1" as |row|}}
        {{row.property}}
        {{row.comparator}}
        {{row.value}}
      {{/body.row}}
    {{/core/filter/filter-body}}`);

  clickTrigger(".comparator-selector");
  typeInSearch("Cust");
  assert.equal($('.ember-power-select-option').length, 1, 'The Custom comparator options is present');
  assert.equal($('.ember-power-select-option--no-matches-message').length, 0,
    'The no match found message is not shown');
});

test('it add comparator when propertyType exist', function(assert) {
  this.set('deleteRow', () => {});
  this.set('filtersRows',
    new A([
      EmberObject.create({
        property: filterObject.create({
          propertyType: 'string',
          label:'Custom String'
        })
      })
    ])
  );

  this.set('comparators', new A([
    comparatorObject.create({
      propertyType: 'string',
      internalName: 'custom',
      label:'Custom'
    })
  ]));

  this.render(hbs `
    {{#core/filter/filter-body filtersRows=filtersRows comparators=comparators as |body|}}
      {{#body.row deleteRow=deleteRow class="row pb-1" as |row|}}
        {{row.property}}
        {{row.comparator}}
        {{row.value}}
      {{/body.row}}
    {{/core/filter/filter-body}}`);

  clickTrigger(".comparator-selector");
  typeInSearch("Cust");
  assert.equal($('.ember-power-select-option').length, 1, 'The Custom comparator options is present');
  assert.equal($('.ember-power-select-option--no-matches-message').length, 0,
    'The no match found message is not shown');
});
