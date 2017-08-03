import Ember from 'ember';
import RecordPage from '../utils/record-page';

const {
  RSVP: { resolve }
} = Ember;

export default Ember.Service.extend({
  isPossiblePage(page, pageSize, totalCount) {
    let maxPage = Math.ceil(totalCount / pageSize);
    return page === 1 || page > 0 && page <= maxPage;
  },

  loadPage(records, queryObj) {
    return RecordPage.create({
      page: queryObj.get('currentPage'),
      records: this.loadRecords(records, queryObj)
    });
  },

  loadRecords(records, queryObj) {
    if (typeof(records) === 'function') {
      return resolve(records(queryObj));
    }
    return resolve(records);
  },
});
