import Ember from 'ember';
import RecordPage from '../utils/record-page';

const {
  RSVP: { resolve }
} = Ember;

export default Ember.Service.extend({
  isPossiblePage(page, pageSize, totalCount) {
    return (page * pageSize) < (totalCount + pageSize) && page > 0;
  },

  loadPage(query, queryObj) {
    return RecordPage.create({
      page: queryObj.get('page'),
      records: this.loadRecords(query, queryObj)
    });
  },

  loadRecords(page, query, queryObj) {
    // TODO manage local data;
    return resolve(query(queryObj));
  },
});
