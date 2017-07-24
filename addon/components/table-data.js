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
    this.resetLoadedPages();
    this.loadFirstPage();
    this.resetQueryObj(this.get('queryObj'));
  }),
  loadFirstPage() {
    let service = this.get('tableData');
    let query = this.get('queryFunction');
    let queryObj = this.get('queryObj');
    let loadedPages = this.get('loadedPages');

    loadedPages.pushObject(service.loadPage(1, query, queryObj));
  },
  resetLoadedPages() {
    this.set('loadedPages', new Ember.A())
  },
  resetQueryObj(queryObj) {
    this.set('queryObj', QueryObj.create(queryObj));
  },

  records: computed('queryObj.currentPage', function () {
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
    let totalCount = this.get('totalCount');

    if (service.isPossiblePage(page, pageSize, totalCount)) {
      let loadedPages = this.get('loadedPages');
      let loadedPage = loadedPages.findBy('page', page);

      if (!loadedPage || this.get('eagerLoading')) {
        loadedPage.removeObject(loadedPage);

        let query = this.get('queryFunction');
        let queryObj = QueryObj.create(this.get('queryObj'));
        queryObj.set('page', page);

        loadedPages.pushObject(service.loadPage(page, query, queryObj));

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
