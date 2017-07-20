import Ember from 'ember';
import QueryObj from '../utils/query-obj';
import RecordPage from '../utils/record-page';
import layout from '../templates/components/table-data';

const {
  computed,
  on,
  RSVP: { resolve },
  inject: { service }
} = Ember;

export default Ember.Component.extend({
  layout,
  classNames: ['table-responsive'],
  tableData: service(),

  queryObj: null,
  queryFunction: null,
  pageSizes: null,

  eagerLoading: true,
  alwaysReload: false,

  loadedPages: null,
  totalCount: null,

  setup: on('init', function () {
    this.resetLoadedPages();
    this.resetQueryObj(this.get('queryObj'));
  }),
  resetLoadedPages() {
    this.set('loadedPages', new Ember.A())
  },
  resetQueryObj(queryObj) {
    this.set('queryObj', QueryObj.create(queryObj));
  },

  records: computed('queryObj.currentPage', function () {
    let currentPage = this.get('queryObj.currentPage');
    let loadedPages = this.get('loadedPages');
    let loadedPage = loadedPages.findBy('page', currentPage);

    if (!loadedPage || this.get('alwaysReload')) {
      loadedPage = this.loadPage(currentPage);
    }

    return loadedPage.get('records');
  }),

  loadPage(page) {
    let loadedPages = this.get('loadedPages');
    let recordPage = loadedPages.findBy('page', page) || loadedPages.pushObject(RecordPage.create({
      page
    }));
    recordPage.set('records', this.loadRecords(page));
    return recordPage;
  },
  loadRecords(page) {
    let queryFunction = this.get('queryFunction');
    let currentQueryObj = this.get('queryObj');
    let isCurrentPage = currentQueryObj.get('page') === page;

    if (isCurrentPage) {
      this.set('isLoading', true);
    }

    let queryObj = QueryObj.create(currentQueryObj);
    queryObj.set('page', page);

    return resolve(queryFunction(queryObj)).then(data => {
      if (isCurrentPage) {
        this.set('totalCount', data.get('meta.totalCount'));
        this.set('isLoading', false);
      }
      return data;
    });
  },

  actions: {
    updatePageSize(pageSize) {
      this.set('queryObj.pageSize', pageSize);
    }
  }
});
