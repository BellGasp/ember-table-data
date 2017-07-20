import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('base/table-header', 'Integration | Component | base/table header', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`
    <table>
    {{#base/table-header}}
      <tr>
        <td>template block text</td>
      </tr>
    {{/base/table-header}}
    </table>
  `);

  assert.equal(this.$('table thead').length, 1);
  assert.equal(this.$('table thead').text().trim(), 'template block text');
});
