import Controller from '@ember/controller';
import QueryObj from 'dummy/utils/query-obj';
import { A } from '@ember/array';
import filterObject from 'ember-table-data/utils/filter-object';

export default Controller.extend({
  queryObj: null,

  properties: new A([
    filterObject.create({ label:'Route', propertyType:'string',
      valueForQuery:'Route' }),
    filterObject.create({ label:'Year of Construction', propertyType:'number',
      valueForQuery:'ConstructionYear' }),
    filterObject.create({ label:'CLLI', propertyType:'string2',
      valueForQuery:'Central.Code' }),
    filterObject.create({ label:'MH #', propertyType:'boolean',
      valueForQuery:'PA' }),
    filterObject.create({ label:'Last Inspection Date', propertyType:'date',
      valueForQuery:'ManholeInspections.OrderByDescending(m => m.CreationDate)'
        + '.FirstOrDefault().CreationDate' }),
    filterObject.create({ label:'Dropdown Test', propertyType:'dropdown', data:[{ id: 1, label: 'test' }, { id: 2, label: 'tesometh' }],
      valueForQuery:'ManholeInspections.OrderByDescending(m => m.CreationDate).FirstOrDefault().CreationDate' })
  ]),

  init(...args) {
    this._super(args);
    this.set('queryObj', new QueryObj({
      currentPage: 1,
      pageSize: 5
    }));
  },
  records() {
    return ['test', 'test3', 'test2'];
  },
  actions: {
    changePage(page) {
      this.set('queryObj.currentPage', page);
    }
  }
});
