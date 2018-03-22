import EmberObject from '@ember/object';

export default EmberObject.extend({
  label:null,
  internalName: null,
  propertyType: null,
  valueForQuery:null,
  showInput: true,
  showComparator: true,

  assignFrom(comparator){
    this.setProperties({
      showInput: comparator.get('showInput'),
      showComparator: comparator.get('showComparator')
    });

    let label = comparator.get('label');
    if (label){
      this.set('label', label);
    }

    let internalName = comparator.get('internalName');
    if (internalName){
      this.set('internalName', internalName);
    }

    let propertyType = comparator.get('propertyType');
    if (propertyType){
      this.set('propertyType', propertyType);
    }

    let valueForQuery = comparator.get('valueForQuery');
    if (valueForQuery){
      this.set('valueForQuery', valueForQuery);
    }
  }
});
