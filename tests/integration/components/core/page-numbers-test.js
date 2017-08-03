import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('core/page-numbers', 'Integration | Component | core/page numbers', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{core/page-numbers}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#core/page-numbers}}
      template block text
    {{/core/page-numbers}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
