import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { A } from '@ember/array';

moduleForComponent('core/filter/filter-row/property', 'Integration | Component | core/filter/filter row/property', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{core/filter/filter-row/property }}`);

  assert.deepEqual(this.$('.property-selector').length, 1,
    'The power select should be visible with no options');
});

test('it renders the comparators when provided', function(assert) {
 this.set('properties',
   new A([
     { label: 'test' },
     { label: 'test2' },
     { label: 'test3' }
   ])
 );
 this.set('filterRowObject', {});

 this.render(hbs `{{core/filter/filter-row/property filterRowObject=filterRowObject properties=properties}}`);

 assert.equal(this.$(".property-selector").text().trim(), 'test', 'The component should select the first comparator available');
});
