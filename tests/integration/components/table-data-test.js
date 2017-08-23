import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('table-data', 'Integration | Component | table data', {
  integration: true
});

test('it renders', function(assert) {

  this.set('records', []);

  this.render(hbs`
    {{#table-data records=records}}
      <table>
        <tr>
          <td>
            template block text
          </td>
        </tr>
      </table>
    {{/table-data}}
  `);

  assert.equal(this.$('table').length, 1);
  assert.equal(this.$('table').text().trim(), 'template block text');
});

test('it throws assertion error without records', function(assert) {
  assert.expectAssertion(() => {
    this.render(hbs`
      {{#table-data}}
        <tr>
          <td>
            template block text
          </td>
        </tr>
      {{/table-data}}`);
  },
  /"records"/,
  'Throws assertion error if records isn\'t passed')
});
