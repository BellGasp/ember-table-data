import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | table-data', function(hooks) {
  setupTest(hooks);

  test('it renders correctly with out query object param', function(assert) {
    assert.expect(5);

    // Creates the component instance
    let component = this.owner.factoryFor('component:table-data').create({ records: [] });

    // Renders the component to the page
    // this.render();

    assert.equal(0, component.get('_queryObj.filters.length'));
    assert.equal(0, component.get('_queryObj.sorts.length'));
    assert.equal(1, component.get('_queryObj.currentPage'));
    assert.equal(10, component.get('_queryObj.pageSize'));
    assert.equal(0, component.get('totalCount'));
  });

  test('it renders correctly with query object param', function(assert) {
    assert.expect(5);

    // Creates the component instance
    let component = this.owner.factoryFor('component:table-data').create({
      records: [],
      totalCount: 500,
      queryObj: { currentPage: 25, pageSize: 50 }
    });

    // Renders the component to the page
    // this.render();

    assert.equal(0, component.get('_queryObj.filters.length'));
    assert.equal(0, component.get('_queryObj.sorts.length'));
    assert.equal(25, component.get('_queryObj.currentPage'));
    assert.equal(50, component.get('_queryObj.pageSize'));
    assert.equal(500, component.get('totalCount'));

  });
});
