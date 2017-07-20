import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('table-data', 'Integration | Component | table data', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  // Template block usage:
  this.render(hbs`
    {{#table-data}}
      <tr>
        <td>
          template block text
        </td>
      </tr>
    {{/table-data}}
  `);

  assert.equal(this.$('table').length, 1);
  assert.equal(this.$('table').text().trim(), 'template block text');
});
