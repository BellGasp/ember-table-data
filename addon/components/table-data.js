import Ember from 'ember';
import QueryObj from '../utils/query-obj';
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

  loadedPages: null,
  totalCount: null,

  setup: on('init', function () {
    if (!this.get('records'))
      Ember.assert('table-data: the property "records" must be passed.');

    this.resetLoadedPages();
    this.resetQueryObj(this.get('queryObj'));

    this.loadFirstPage();
  }),
  loadFirstPage() {
    let service = this.get('tableData');
    let records = this.get('records');
    let queryObj = this.get('queryObj');
    let loadedPages = this.get('loadedPages');

    loadedPages.pushObject(service.loadPage(records, queryObj));
  },
  resetLoadedPages() {
    this.set('loadedPages', new Ember.A())
  },
  resetQueryObj(queryObj) {
    this.set('queryObj', QueryObj.create(queryObj));
  },

  pageRecords: computed('queryObj.currentPage', function () {
    let currentPage = this.get('queryObj.currentPage');
    let loadedPage = this.loadPage(currentPage);

    if (this.get('eagerLoading')) {
      resolve(loadedPage).then(lPage => {
        let pageNumber = lPage.get('page');
        this.loadPage(pageNumber - 1);
        this.loadPage(pageNumber + 1);
      });
    }

    return loadedPage.get('records');
  }),

  loadPage(page) {
    let service = this.get('tableData');
    let pageSize = this.get('queryObj.pageSize');
    let totalCount = this.get('queryObj.totalCount');

    if (service.isPossiblePage(page, pageSize, totalCount)) {
      let loadedPages = this.get('loadedPages');
      let loadedPage = loadedPages.findBy('page', page);

      if (!loadedPage || this.get('eagerLoading')) {
        loadedPage.removeObject(loadedPage);

        let records = this.get('records');
        let queryObj = QueryObj.create(this.get('queryObj'));
        queryObj.set('currentPage', page);

        loadedPages.pushObject(service.loadPage(records, queryObj));

        queryObj.destroy();
      }
      return loadedPage;
    }
  },

  actions: {
    updatePageSize(pageSize) {
      this.set('queryObj.pageSize', pageSize);
    }
  }
});
