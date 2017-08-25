import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('base/table-container', 'Integration | Component | base/table container', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#base/table-container}}
        <tr>
          <td>Test text block</td>
        </tr>
    {{/base/table-container}}
  `);

  assert.equal(this.$().text().trim(), 'Test text block');
  assert.equal(this.$('table').length, 1);
});
