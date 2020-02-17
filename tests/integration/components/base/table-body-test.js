import { resolve, Promise as EmberPromise } from 'rsvp';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import DS from 'ember-data';

const { PromiseArray } = DS;

module('Integration | Component | base/table body', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders multiple records', async function(assert) {
    let records = ['test1', 'test2'];
    let recordsPromise = PromiseArray.create({
      promise: resolve(records)
    });
    this.set('records', recordsPromise);
    // Template block usage:
    await render(hbs`
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
    return settled().then(() => {
      assert.equal(this.element.querySelectorAll('table tbody').length, 1);
      assert.equal(this.element.querySelectorAll('table tbody tr').length, 2);
      assert.equal(this.element.querySelector('table tbody tr:nth-child(1) td').textContent.trim(), 'test1');
      assert.equal(this.element.querySelector('table tbody tr:nth-child(2) td').textContent.trim(), 'test2');
    });
  });

  test('it renders empty records row', async function(assert) {
    let records = [];
    let recordsPromise = PromiseArray.create({
      promise: resolve(records)
    });
    this.set('records', recordsPromise);
    // Template block usage:
    await render(hbs`
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
    return settled().then(() => {
      assert.equal(this.element.querySelectorAll('table tbody').length, 1);
      assert.equal(this.element.querySelectorAll('table tbody tr').length, 1);
      assert.equal(this.element.querySelector('table tbody tr td').textContent.trim(), 'Test empty');
    });
  });

  test('it renders loading record row', async function(assert) {

    let promise = new EmberPromise(() => {});
    let recordsPromise = PromiseArray.create({
      promise: promise
    });
    this.set('records', recordsPromise);
    // Template block usage:
    await render(hbs`
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
    assert.equal(this.element.querySelectorAll('table tbody').length, 1);
    assert.equal(this.element.querySelectorAll('table tbody tr').length, 1);
    assert.equal(this.element.querySelector('table tbody tr td').textContent.trim(), 'Test loading');
  });
});
