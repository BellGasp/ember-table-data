import { JSONAPISerializer } from 'ember-cli-mirage';

export default JSONAPISerializer.extend({

  serialize(object) {
    let json = JSONAPISerializer.prototype.serialize.apply(this, arguments);
    if (object.meta) {
      json.meta = object.meta;
    }
    return json;
  }

});