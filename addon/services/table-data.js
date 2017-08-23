import Ember from 'ember';
import RecordPage from '../utils/record-page';
import DS from 'ember-data';

const {
  RSVP: { Promise }
} = Ember;

const { PromiseArray } = DS;

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
    let promise = new Promise(resolve => {
      if (typeof(records) === 'function') {
        resolve(records(queryObj));
      } else {
        resolve(records)
      }
    });
    let handler = result => {
      var data = Ember.A(result);
      if (data.get('meta.totalCount')) {
        queryObj.set('totalCount', data.get('meta.totalCount'));
      } else {
        queryObj.set('totalCount', data.get('length'));
      }
      return data;
    };

    let promiseArray = PromiseArray.create({
      promise: promise.then(handler)
    });
    return promiseArray;
  }
});
