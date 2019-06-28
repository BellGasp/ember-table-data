import { A } from '@ember/array';
import { assert } from '@ember/debug';
import Component from '@ember/component';
import { observer, computed, get } from '@ember/object';
import { inject as service } from '@ember/service';
import Query from '../utils/query-obj';
import layout from '../templates/components/table-data';
import { isEmpty } from '@ember/utils';

const DEFAULT_PAGE = 1, DEFAULT_PAGE_SIZE = 10, DEFAULT_COUNT = 0;

export default Component.extend({
  layout,

  tableData: service(),

  queryObj: null,
  _queryObj: null,

  eagerLoading: true,
  updatePageAfter: 10,

  loadedPages: null,
  totalCount: null,

  init() {
    this._super(...arguments);

    this.validateParameters();

    this.setProperties({
      _queryObj: Query.create(),
      loadedPages: A()
    });

    // Setup the query with the passed in params or default values.
    const query = this.get('queryObj') || {};
    const {
      currentPage = DEFAULT_PAGE,
      pageSize = DEFAULT_PAGE_SIZE,
      filters = A(),
      sorts = A()
    } = query;

    this.get('_queryObj').setProperties({ currentPage, pageSize, filters, sorts });

    // Setup `totalCount` with the passed-in params or default values.
    const totalCount = this.get('totalCount') || DEFAULT_COUNT;
    this.set('totalCount', totalCount);
  },

  resetLoadedPages: observer('records', 'records.[]', '_queryObj.pageSize', function() {
    this.get('loadedPages').clear();
    this.send('updatePage', DEFAULT_PAGE);
  }),

  validateParameters() {
    const { records, queryObj, totalCount } = this.getProperties(['records', 'queryObj', 'totalCount']);

    if (!records) {
      assert('ember-table-data: The property `records` must be passed.');
    }

    if (queryObj && isEmpty(totalCount) || !queryObj && !isEmpty(totalCount)) {
      assert('ember-table-data: If you pass either `queryObj` or `totalCount` param, both should be passed.');
    }
  },

  pageRecords: computed('_queryObj.{currentPage,pageSize,filters.[],sorts.[]}', function() {
    let currentPage = this.get('_queryObj.currentPage');
    let loadedPage = this.loadPage(currentPage, true);

    let records = loadedPage.get('records');

    records.then(data => {
      if (!data) return;

      if (!data.get) {
        data = A(data);
      }

      if (this.get('eagerLoading')) {
        let pageNumber = loadedPage.get('page');
        this.loadPage(pageNumber - 1);
        this.loadPage(pageNumber + 1);
      }
    });

    return records;
  }),

  shouldReloadPage(loadedPage) {
    if (!loadedPage.get('forceReload')){
      let lastUpdated = loadedPage.get('lastUpdated');
      let now = Date.now();
      let diffInMin = (lastUpdated - now) / 1000 / 60;
      let maxDiffInMin = this.get('updatePageAfter');
      return diffInMin >= maxDiffInMin;
    }

    return true;
  },

  updateTotalCount(loadedPage, data) {
    if (!data) return;

    let totalCount = get(data, 'meta.totalCount') || get(data, 'meta.total-count');
    if (totalCount) {
      this.set('totalCount', totalCount);
    } else {
      this.set('totalCount', data.length);
    }
  },

  triggerOnDataChangeAction(queryObj, onDataChange) {
    let onDataChangeClosureAction = this.get('onDataChange');
    if (onDataChange && onDataChangeClosureAction){
      onDataChangeClosureAction(queryObj, this.get('totalCount'));
    }
  },

  loadPageData(loadedPage, page, onDataChange) {
    let service = this.get('tableData');
    let loadedPages = this.get('loadedPages');
    loadedPages.removeObject(loadedPage);

    let records = this.get('records');
    let queryObj = Query.create(this.get('_queryObj'));
    queryObj.set('currentPage', page);

    loadedPage = service.loadPage(records, queryObj);
    loadedPage.get('records').then(data => {
      this.updateTotalCount(loadedPage, data);
      this.triggerOnDataChangeAction(queryObj, onDataChange);
    });
    loadedPage.set('forceReload', false);
    loadedPages.pushObject(loadedPage);

    queryObj.destroy();
    return loadedPage;
  },

  loadPage(page, onDataChange) {
    let service = this.get('tableData');
    let pageSize = this.get('_queryObj.pageSize');
    let totalCount = this.get('totalCount');

    if (service.isPossiblePage(page, pageSize, totalCount)) {
      let loadedPages = this.get('loadedPages');
      let loadedPage = loadedPages.findBy('page', page);
      let shouldLoadPage = !loadedPage ||
        !this.get('eagerLoading') ||
        this.shouldReloadPage(loadedPage);
      if (shouldLoadPage) {
        loadedPage = this.loadPageData(loadedPage, page, onDataChange);
      } else {
        this.triggerOnDataChangeAction(this.get('_queryObj'), onDataChange);
      }
      return loadedPage;
    }
  },

  forceReload(page) {
    let pageToReload = page || this.get('_queryObj.currentPage');
    let loadedCurrentPage = this.get('loadedPages').findBy('page', pageToReload);
    loadedCurrentPage.set('forceReload', true);
  },

  notifySortsObservers() {},
  notifyCurrentPageObservers() {},
  notifyPageSizeObservers() {},
  notifyFiltersObservers() {},

  actions: {
    updateSorts(sorts) {
      this.resetLoadedPages();
      this.set('_queryObj.sorts', sorts);
      this.notifySortsObservers(sorts);
    },

    updatePageSize(pageSize) {
      this.resetLoadedPages();
      this.set('_queryObj.pageSize', pageSize);
      this.notifyPageSizeObservers(pageSize);
    },

    updatePage(page) {
      this.set('_queryObj.currentPage', page);
      this.notifyCurrentPageObservers(page);
    },

    refreshPage(page) {
      this.forceReload(page);
      this.notifyPropertyChange('_queryObj.currentPage');
    },

    resetPages() {
      this.resetLoadedPages();
      this.notifyPropertyChange('_queryObj.currentPage');
    },

    updateFilter(filters){
      this.resetLoadedPages();
      this.set('_queryObj.filters', filters);
      this.notifyFiltersObservers(filters);
    }
  }
});
