import EmberObject from '@ember/object';

export default EmberObject.extend({

  property: null,
  comparator: null,
  value: null,

  copyFromObject(row) {
    return this.setProperties({
      comparator: row.comparator,
      property: row.property
    });
  }

});