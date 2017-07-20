import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('base/table-body', 'Integration | Component | base/table body', {
  integration: true
});

test('it renders multiple records', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('records', ['test1', 'test2']);
  // Template block usage:
  this.render(hbs`
    <table>
      {{#base/table-body records=records as |body record|}}
        <tr>
          <td>{{record}}</td>
        </tr>
      {{/base/table-body}}
    </table>
  `);

  assert.equal(this.$('table tbody').length, 1);
  assert.equal(this.$('table tbody tr').length, 2);
  assert.equal(this.$('table tbody tr:eq(0) td').text().trim(), 'test1');
  assert.equal(this.$('table tbody tr:eq(1) td').text().trim(), 'test2');
});
