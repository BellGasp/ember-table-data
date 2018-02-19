import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('core/filter/filter-footer',
  'Integration | Component | core/filter/filter footer', {
    integration: true
  }
);

test('it renders', function(assert) {
  this.render(hbs `{{core/filter/filter-footer}}`);

  assert.equal(this.$().text().trim(), '', 'Theres no default layout to the component. ' +
    'Should be empty if you dont use yeld component');
});
