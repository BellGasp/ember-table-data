import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('table-data', 'Unit | Component | table-data', {
  // Specify the other units that are required for this test
  needs: ['service:table-data'],
  unit: true
});

test('it renders correctly with out query object param', function(assert) {
  assert.expect(5);

  // Creates the component instance
  let component = this.subject({ records: [] });

  // Renders the component to the page
  this.render();

  assert.equal(0, component.get('_queryObj.filters.length'));
  assert.equal(0, component.get('_queryObj.sorts.length'));
  assert.equal(1, component.get('_queryObj.currentPage'));
  assert.equal(10, component.get('_queryObj.pageSize'));
  assert.equal(0, component.get('totalCount'));
});

test('it renders correctly with query object param', function(assert) {
  assert.expect(5);

  // Creates the component instance
  let component = this.subject({
    records: [],
    totalCount: 500,
    queryObj: { currentPage: 25, pageSize: 50 }
  });

  // Renders the component to the page
  this.render();

  assert.equal(0, component.get('_queryObj.filters.length'));
  assert.equal(0, component.get('_queryObj.sorts.length'));
  assert.equal(25, component.get('_queryObj.currentPage'));
  assert.equal(50, component.get('_queryObj.pageSize'));
  assert.equal(500, component.get('totalCount'));

});
