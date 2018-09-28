import { RestSerializer } from 'ember-cli-mirage';

export default RestSerializer.extend({

  serialize(object) {
    let json = RestSerializer.prototype.serialize.apply(this, arguments);
    if (object.meta) {
      json.meta = object.meta;
    }
    return json;
  }

});