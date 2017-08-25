import Ember from 'ember';
import RecordPage from '../utils/record-page';
import DS from 'ember-data';

const { PromiseArray } = DS;
const { RSVP: { resolve }} = Ember;

export default Ember.Service.extend({
  isPossiblePage(page, pageSize, totalCount) {
    let maxPage = Math.ceil(totalCount / pageSize);
    return page === 1 || page > 0 && page <= maxPage;
  },

  loadPage(records, queryObj) {
    var recordPage = RecordPage.create();
    recordPage.page = queryObj.get('currentPage');
    recordPage.records = this.loadRecords(records, queryObj);
    return recordPage;
  },

  loadRecords(records, queryObj) {
    let recordsPromise;
    if (typeof(records) === 'function') {
      recordsPromise = records(queryObj.toQueryableObject());
    } else {
      recordsPromise = records
    }

    return PromiseArray.create({
      promise: resolve(recordsPromise)
    });
  }
});
