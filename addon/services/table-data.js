import Service from '@ember/service';
import { resolve } from 'rsvp';
import RecordPage from '../utils/record-page';
import DS from 'ember-data';

const { PromiseArray } = DS;

export default Service.extend({
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
      recordsPromise = this.paginateRecords(records);
    }

    return PromiseArray.create({
      promise: resolve(recordsPromise)
    });
  },
  paginateRecords(records, {currentPage, pageSize}) {
    let firstRecordIndex = currentPage * pageSize - pageSize;
    return records.slice(firstRecordIndex,firstRecordIndex + pageSize);
  }
});
