import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { run } from '@ember/runloop';
import startApp from 'dummy/tests/helpers/start-app';
var App;

moduleForComponent('core/filter/filter-row/value', 'Integration | Component | core/filter/filter row/value', {
  integration: true,
  beforeEach: function() {
    App = startApp();
  },
  afterEach: function() {
    run(App, App.destroy);
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{core/filter/filter-row/value propertyType="string" }}`);

  assert.equal(this.$().text().trim(), '');
});
