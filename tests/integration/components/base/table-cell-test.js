import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('base/table-cell', 'Integration | Component | base/table cell', {
  integration: true
});

test('it renders as td', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  // Template block usage:
  this.render(hbs`
    <table>
      <tbody>
        <tr>
          {{#base/table-cell}}
            template block text
          {{/base/table-cell}}
        </tr>
      </tbody>
    </table>
  `);

  assert.equal(this.$('tr td').length, 1);
  assert.equal(this.$('tr td').text().trim(), 'template block text');
});

test('it renders as th', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  // Template block usage:
  this.render(hbs`
    <table>
      <tbody>
        <tr>
          {{#base/table-cell tagName='th'}}
            template block text
          {{/base/table-cell}}
        </tr>
      </tbody>
    </table>
  `);

  assert.equal(this.$('tr td').length, 0);
  assert.equal(this.$('tr th').length, 1);
  assert.equal(this.$('tr th').text().trim(), 'template block text');
});
