import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('base/table-row', 'Integration | Component | base/table row', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  // Template block usage:
  this.render(hbs`
    <table>
      {{#base/table-row}}
        <td>template block text</td>
      {{/base/table-row}}
    </table>
  `);

  assert.equal(this.$('table tr').length, 1);
  assert.equal(this.$('table tr').text().trim(), 'template block text');
});
