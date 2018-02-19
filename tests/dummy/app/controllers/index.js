import Controller from '@ember/controller';
import { A } from '@ember/array';
import filterObject from 'ember-table-data/utils/filter-object';

export default Controller.extend({
  properties: new A([
    filterObject.create({ label:'Route', propertyType:'string',
      valueForQuery:'Route' }),
    filterObject.create({ label:'Year of Construction', propertyType:'number',
      valueForQuery:'ConstructionYear' }),
    filterObject.create({ label:'CLLI', propertyType:'string',
      valueForQuery:'Central.Code' }),
    filterObject.create({ label:'MH #', propertyType:'boolean',
      valueForQuery:'PA' }),
    filterObject.create({ label:'Last Inspection Date', propertyType:'date',
      valueForQuery:'ManholeInspections.OrderByDescending(m => m.CreationDate)'
        + '.FirstOrDefault().CreationDate' })
  ])
});
