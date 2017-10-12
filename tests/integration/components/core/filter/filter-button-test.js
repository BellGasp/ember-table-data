import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('core/filter/filter-button', 'Integration | Component | core/filter/filter button', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{core/filter/filter-button}}`);

  assert.equal(this.$().text().trim(), '', 'Theres no default layout to the component. ' +
    'Should be empty if you dont use yeld component');
});

test('it render the component with blocks (button)', function(assert) {

  this.render(hbs`
    {{#core/filter/filter-button}}
      <p>test</p>
    {{/core/filter/filter-button}}
  `);

  assert.equal(this.$('button').length, 1, 'It render the button when using the addButton component');
  assert.equal(this.$('button > p').length, 1, 'It render the inner blocks when using the addButton component');
  assert.equal(this.$('button > p').text().trim(), 'test', 'It render the inner text blocks when using the addButton component');
});

test('it execute action when click', function(assert) {
  assert.expect(1)
  this.set('externalAction', () =>{
      assert.ok(true);
  });

  this.render(hbs`
    {{#core/filter/filter-button click=(action externalAction)}}
      <p>test</p>
    {{/core/filter/filter-button}}
  `);

  this.$('button').click();
});
