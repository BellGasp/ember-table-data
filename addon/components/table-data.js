import Ember from 'ember';
import QueryObj from '../utils/query-obj';
import layout from '../templates/components/table-data';

const {
  computed,
  on,
  observer,
  inject: { service }
} = Ember;

export default Ember.Component.extend({
  layout,
  classNames: ['table-responsive', 'col-12'],
  tableData: service(),

  queryObj: null,
  queryFunction: null,

  eagerLoading: true,
  updatePageAfter: 10,

  loadedPages: null,
  totalCount: 0,


  setup: on('init', function () {
    if (!this.get('records'))
      Ember.assert('table-data: the property "records" must be passed.');

    this.set('loadedPages', new Ember.A());
    this.resetQueryObj(this.get('queryObj'));
  }),
  resetLoadedPages: observer('queryObj.pageSize', function() {
    this.get('loadedPages').clear();
  }),
  resetQueryObj(queryObj) {
    this.set('queryObj', QueryObj.create(queryObj));
  },

  pageRecords: computed('queryObj.{currentPage,pageSize}', function () {
    let currentPage = this.get('queryObj.currentPage');
    let loadedPage = this.loadPage(currentPage);

    let records = loadedPage.get('records');
    records.then(data => {
      if (data.get('meta.totalCount')) {
         this.set('totalCount', data.get('meta.totalCount'));
       } else {
         this.set('totalCount', data.get('length'));
       }

       if (this.get('eagerLoading')) {
         let pageNumber = loadedPage.get('page');
         this.loadPage(pageNumber - 1);
         this.loadPage(pageNumber + 1);
       }
    })
    return records
  }),
  shouldReloadPage(loadedPage) {
    let lastUpdated = loadedPage.get('lastUpdated');
    let now = Date.now();
    let diffInMin = (lastUpdated - now) / 1000 / 60;
    let maxDiffInMin = this.get('updatePageAfter')
    return diffInMin >= maxDiffInMin;
  },
  loadPage(page) {
    let service = this.get('tableData');
    let pageSize = this.get('queryObj.pageSize');
    let totalCount = this.get('totalCount');

    if (service.isPossiblePage(page, pageSize, totalCount)) {
      let loadedPages = this.get('loadedPages');
      let loadedPage = loadedPages.findBy('page', page);
      let shoudLoadPage = !loadedPage ||!this.get('eagerLoading') || this.shouldReloadPage(loadedPage);
      if (shoudLoadPage) {
        loadedPages.removeObject(loadedPage);

        let records = this.get('records');
        let queryObj = QueryObj.create(this.get('queryObj'));
        queryObj.set('currentPage', page);

        loadedPage = service.loadPage(records, queryObj);
        loadedPages.pushObject(loadedPage);

        queryObj.destroy();
      }
      return loadedPage;
    }
  },

  actions: {
    updatePageSize(pageSize) {
      this.set('queryObj.pageSize', pageSize);
    },
    updatePage(page){
      this.set('queryObj.currentPage', page);
    }
  }
});
