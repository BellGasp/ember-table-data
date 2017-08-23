import Ember from 'ember';
import layout from '../../templates/components/core/page-numbers';

const { computed, on, isPresent } = Ember;

export default Ember.Component.extend({
  layout,

  setup: on('init', function () {
    this.assertRequiredProperties();
    this.set('currentPageToShow', this.get('queryObj.currentPage'));
  }),

  assertRequiredProperties() {
    if (!isPresent(this.get('queryObj')))
      Ember.assert('table-data: the property "queryObj" must be passed.');

    if (!isPresent(this.get('queryObj.currentPage')))
      Ember.assert('table-data: the property "queryObj.currentPage" must be passed.');

    if (!isPresent(this.get('queryObj.totalCount')))
      Ember.assert('table-data: the property "queryObj.totalCount" must be passed.');

    if (!isPresent(this.get('queryObj.pageSize')))
      Ember.assert('table-data: the property "queryObj.pageSize" must be passed.');
  },

  lastPage: computed('queryObj.{totalCount,pageSize}', function() {
    let { totalCount, pageSize } = this.get('queryObj');
    return Math.ceil(totalCount / pageSize) || 1;
  }),

  isLastPage: computed('queryObj.{totalCount,pageSize,currentPage}', function () {
    return this.get('lastPage') === this.get('queryObj.currentPage');
  }),
  isFirstPage: computed('queryObj.{currentPage}', function () {
    return this.get('queryObj.currentPage') === 1;
  }),

  hasMoreBefore: computed('queryObj.{totalCount,pageSize,currentPage}', function () {
    let firstPageShown = this.get('pageNumbers.firstObject');
    let showHasMore = this.get('showHasMore');
    return firstPageShown !== 1 && showHasMore;
  }),
  hasMoreAfter: computed('queryObj.{totalCount,pageSize,currentPage}', function () {
    let lastPageShown = this.get('pageNumbers.lastObject');
    let lastPage = this.get('lastPage');
    let showHasMore = this.get('showHasMore');
    return lastPageShown !== lastPage && showHasMore;
  }),

  showFL: true,
  showPN: true,
  showHasMore: true,

  currentPageToShow: 1,
  nbPagesToShow: 5,

  pageNumbers: computed('currentPageToShow', 'queryObj.{totalCount,pageSize,currentPage}', function () {
    let nbPagesWithoutCurrent = this.get('nbPagesToShow') - 1;
    let currentPage = this.get('currentPageToShow');
    let lastPage = this.get('lastPage');

    if (currentPage < 1 ) {
      currentPage = 1;
    }
    if (currentPage > lastPage) {
      currentPage = lastPage
    }

    let nbPagesBefore = parseInt(nbPagesWithoutCurrent / 2);
    let nbPagesAfter = nbPagesWithoutCurrent - nbPagesBefore;

    let firstPageToShow = currentPage - nbPagesBefore;
    let lastPageToShow = currentPage + nbPagesAfter;

    while (firstPageToShow < 1) {
      firstPageToShow++;
      if (lastPageToShow < lastPage) {
        lastPageToShow++;
      }
    }

    while (lastPageToShow > lastPage) {
      lastPageToShow--;
      if (firstPageToShow > 1) {
        firstPageToShow--;
      }
    }

    let nbOfPagesToShow = lastPageToShow - firstPageToShow + 1;
    return Ember.A(Array.from(new Array(nbOfPagesToShow), (x, i) => firstPageToShow + i));
  }),

  actions: {
    goToPage(page) {
      this.set('currentPageToShow', page);
      this.get('changePage')(page);
    },
    goToNext() {
      this.send('goToPage', this.get('queryObj.currentPage') + 1);
    },
    goToPrev() {
      this.send('goToPage', this.get('queryObj.currentPage') - 1);
    },
    goToFirst() {
      this.send('goToPage', 1);
    },
    goToLast() {
      this.send('goToPage', this.get('lastPage'));
    },
    showMoreBefore() {
      let nbOfPagesShown = this.get('pageNumbers.length');
      let currentPage = this.get('queryObj.currentPage');
      this.set('currentPageToShow', currentPage - nbOfPagesShown);
    },
    showMoreAfter() {
      let nbOfPagesShown = this.get('pageNumbers.length');
      let currentPage = this.get('queryObj.currentPage');
      this.set('currentPageToShow', currentPage + nbOfPagesShown);
    }
  }
});
