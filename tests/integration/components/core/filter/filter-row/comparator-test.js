import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { A } from '@ember/array';

moduleForComponent('core/filter/filter-row/comparator',
  'Integration | Component | core/filter/filter row/comparator', {
    integration: true
  });

test('it renders', function(assert) {

  this.render(hbs `{{core/filter/filter-row/comparator }}`);

  assert.deepEqual(this.$('.comparator-selector').length, 1,
    'The power select should be visible with no options');
});

 test('it renders the comparators when provided', function(assert) {
  this.set('filteredComparators',
    A([
      { label: 'test' },
      { label: 'test2' },
      { label: 'test3' }
    ])
  );
  this.set('filterRowObject', {});

  this.render(hbs `{{core/filter/filter-row/comparator filterRowObject=filterRowObject filteredComparators=filteredComparators}}`);

  assert.equal(this.$('.comparator-selector').text().trim(), 'test', 'The component should select the first comparator available');
});
