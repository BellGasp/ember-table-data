import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { nativeMouseDown, nativeMouseUp } from 'dummy/tests/helpers/ember-power-select';

moduleForComponent('core/page-size', 'Integration | Component | core/page size', {
  integration: true
});

test('it renders with default page size', function(assert) {
  this.set('externalAction', actual => {
    assert.equal(actual, 5, 'submitted value is passed to external action');
  });
  this.render(hbs`{{core/page-size updatePageSize=(action externalAction)}}`);
  assert.equal(this.$('.ember-power-select-selected-item').text().trim(), '5', 'Selected value should be 5');
});

test('it renders with given page size', function(assert) {
  this.set('pageSize', 10);
  this.render(hbs`{{core/page-size pageSize=pageSize}}`);
  assert.equal(this.$('.ember-power-select-selected-item').text().trim(), '10', 'Selected value should be 10');
});

test('it renders with invalid page size', function(assert) {
  this.set('externalAction', actual => {
    assert.equal(actual, 5, 'submitted value is passed to external action');
  });
  this.set('pageSize', 11);
  this.render(hbs`{{core/page-size pageSize=pageSize updatePageSize=(action externalAction)}}`);
  assert.equal(this.$('.ember-power-select-selected-item').text().trim(), '5', 'Selected value should be 5');
});

test('Can select another page size (10)', function(assert) {
  this.set('expectedValue', 5);
  this.set('externalAction', actual => {
    assert.equal(actual, this.get('expectedValue'), `submitted value is passed to external action (${actual})`);
  });

  this.render(hbs`{{core/page-size updatePageSize=(action externalAction)}}`);

  assert.equal(this.$('.ember-power-select-selected-item').text().trim(), 5, 'Selected value should be 5');

  this.set('expectedValue', 10);
  nativeMouseDown('.ember-power-select-trigger');
  nativeMouseUp('.ember-power-select-option:nth-child(2)');

  assert.equal(this.$('.ember-power-select-selected-item').text().trim(), 10, 'Selected value should be 10');
});

test('It renders with custom page sizes', function(assert) {
  this.set('expectedValue', 6);
  this.set('externalAction', actual => {
    assert.equal(actual, this.get('expectedValue'), `submitted value is passed to external action (${actual})`);
  });
  this.set('pageSizes', [6, 11]);
  this.render(hbs`{{core/page-size pageSizes=pageSizes updatePageSize=(action externalAction)}}`);

  assert.equal(this.$('.ember-power-select-selected-item').text().trim(), 6, 'Selected value should be 6');

  this.set('expectedValue', 11);
  nativeMouseDown('.ember-power-select-trigger');
  nativeMouseUp('.ember-power-select-option:nth-child(2)');

  assert.equal(this.$('.ember-power-select-selected-item').text().trim(), 11, 'Selected value should be 11');
});

test('It renders with custom page sizes', function(assert) {
  this.set('pageSizes', [6, 11]);
  this.set('pageSize', 11);
  this.render(hbs`{{core/page-size pageSize=pageSize pageSizes=pageSizes}}`);
  assert.equal(this.$('.ember-power-select-selected-item').text().trim(), '11', 'Selected value should be 11');
});
