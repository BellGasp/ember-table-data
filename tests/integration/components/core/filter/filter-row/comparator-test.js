import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { A } from '@ember/array';

module('Integration | Component | core/filter/filter row/comparator', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    await render(hbs `{{core/filter/filter-row/comparator }}`);

    assert.deepEqual(this.element.querySelectorAll('.comparator-selector').length, 1,
      'The power select should be visible with no options');
  });

  test('it renders the comparators when provided', async function(assert) {
   this.set('filteredComparators',
     A([
       { label: 'test' },
       { label: 'test2' },
       { label: 'test3' }
     ])
   );
   this.set('filterRowObject', {});

   await render(
     hbs `{{core/filter/filter-row/comparator filterRowObject=filterRowObject filteredComparators=filteredComparators}}`
   );

   assert.equal(this.element.querySelector('.comparator-selector').textContent.trim(), 'test', 'The component should select the first comparator available');
 });
});
