import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import DS from 'ember-data';
import wait from 'ember-test-helpers/wait';

const { PromiseArray } = DS;
const { RSVP: { resolve }} = Ember;

moduleForComponent('base/table-body', 'Integration | Component | base/table body', {
  integration: true
});

test('it renders multiple records', function(assert) {
  let records = ['test1', 'test2'];
  let recordsPromise = new PromiseArray({
    promise: resolve(records)
  });
  this.set('records', recordsPromise);
  // Template block usage:
  this.render(hbs`
    <table>
      {{#base/table-body records=records as |body record|}}
        {{#body.loadingRow}}
          <td>Test loading</td>
        {{/body.loadingRow}}

        {{#body.emptyRow}}
          <td>Test empty</td>
        {{/body.emptyRow}}

        {{#body.row}}
          <td>{{record}}</td>
        {{/body.row}}
      {{/base/table-body}}
    </table>
  `);
  return wait().then(() => {
    assert.equal(this.$('table tbody').length, 1);
    assert.equal(this.$('table tbody tr').length, 2);
    assert.equal(this.$('table tbody tr:eq(0) td').text().trim(), 'test1');
    assert.equal(this.$('table tbody tr:eq(1) td').text().trim(), 'test2');
  });
});

test('it renders empty records row', function(assert) {
  let records = [];
  let recordsPromise = new PromiseArray({
    promise: resolve(records)
  });
  this.set('records', recordsPromise);
  // Template block usage:
  this.render(hbs`
    <table>
      {{#base/table-body records=records as |body record|}}
        {{#body.loadingRow}}
          <td>Test loading</td>
        {{/body.loadingRow}}

        {{#body.emptyRow}}
          <td>Test empty</td>
        {{/body.emptyRow}}

        {{#body.row}}
          <td>{{record}}</td>
        {{/body.row}}
      {{/base/table-body}}
    </table>
  `);
  return wait().then(() => {
    assert.equal(this.$('table tbody').length, 1);
    assert.equal(this.$('table tbody tr').length, 1);
    assert.equal(this.$('table tbody tr td').text().trim(), 'Test empty');
  });
});

test('it renders loading record row', function(assert) {

  let promise = new Ember.RSVP.Promise(() => {});

  let recordsPromise = new PromiseArray({
    promise: promise
  });
  this.set('records', recordsPromise);
  // Template block usage:
  this.render(hbs`
    <table>
      {{#base/table-body records=records as |body record|}}
        {{#body.loadingRow}}
          <td>Test loading</td>
        {{/body.loadingRow}}

        {{#body.emptyRow}}
          <td>Test empty</td>
        {{/body.emptyRow}}

        {{#body.row}}
          <td>{{record}}</td>
        {{/body.row}}
      {{/base/table-body}}
    </table>
  `);
  assert.equal(this.$('table tbody').length, 1);
  assert.equal(this.$('table tbody tr').length, 1);
  assert.equal(this.$('table tbody tr td').text().trim(), 'Test loading');
});
