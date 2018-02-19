import EmberObject from '@ember/object';

export default EmberObject.extend({
  label: null,
  internalName: null,
  propertyType: null,
  valueForQuery:null,
  showInput: true,
  showComparator: true
});
