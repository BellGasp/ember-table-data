import { A } from '@ember/array';
import { assert } from '@ember/debug';
import Component from '@ember/component';
import { observer, computed } from '@ember/object';
import { on } from '@ember/object/evented';
import { isPresent } from '@ember/utils';

import layout from '../../templates/components/core/page-numbers';

export default Component.extend({
  layout,

  setup: on('init', function () {
    this.assertRequiredProperties();
    this.set('currentPageToShow', this.get('queryObj.currentPage'));
  }),

  assertRequiredProperties() {
    if (!isPresent(this.get('queryObj')))
      assert('table-data: the property "queryObj" must be passed.');

    if (!isPresent(this.get('queryObj.currentPage')))
      assert('table-data: the property "queryObj.currentPage" must be passed.');

    if (!isPresent(this.get('totalCount')))
      assert('table-data: the property "totalCount" must be passed.');

    if (!isPresent(this.get('queryObj.pageSize')))
      assert('table-data: the property "queryObj.pageSize" must be passed.');
  },

  lastPage: computed('queryObj.pageSize', 'totalCount', function() {
    let pageSize = this.get('queryObj.pageSize');
    let totalCount = this.get('totalCount');
    return Math.ceil(totalCount / pageSize) || 1;
  }),

  isLastPage: computed('queryObj.currentPage', 'lastPage', function () {
    return this.get('lastPage') === this.get('queryObj.currentPage');
  }),
  isFirstPage: computed('queryObj.currentPage', function () {
    return this.get('queryObj.currentPage') === 1;
  }),

  hasMoreBefore: computed('pageNumbers.firstObject', 'showHasMore', function () {
    let firstPageShown = this.get('pageNumbers.firstObject');
    let showHasMore = this.get('showHasMore');
    return firstPageShown !== 1 && showHasMore;
  }),
  hasMoreAfter: computed('pageNumbers.lastObject', 'showHasMore', function () {
    let lastPageShown = this.get('pageNumbers.lastObject');
    let lastPage = this.get('lastPage');
    let showHasMore = this.get('showHasMore');
    return lastPageShown !== lastPage && showHasMore;
  }),

  showFL: true,
  showPN: true,
  showHasMore: true,

  updatesCurrentPageToShow: observer('queryObj.{currentPage,pageSize}', 'totalCount', function() {
    this.set('currentPageToShow', this.get('queryObj.currentPage'));
  }),

  currentPageToShow: 1,
  nbPagesToShow: 5,

  pageNumbers: computed('currentPageToShow', 'lastPage', function () {
    let nbPagesWithoutCurrent = this.get('nbPagesToShow') - 1;
    let currentPage = this.get('currentPageToShow');
    let lastPage = this.get('lastPage');

    if (currentPage < 1 ) {
      currentPage = 1;
      if (currentPage === this.get('queryObj.currentPage')){
        this.get('changePage')(currentPage);
        return;
      }
    }
    if (currentPage > lastPage) {
      currentPage = lastPage
      if (currentPage === this.get('queryObj.currentPage')){
        this.get('changePage')(currentPage);
        return;
      }
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
    return A(Array.from(new Array(nbOfPagesToShow), (x, i) => firstPageToShow + i));
  }),

  actions: {
    goToPage(page) {
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
    showMore(before) {
      let nbOfPagesShown = this.get('pageNumbers.length');
      let currentPage = this.get('currentPageToShow');

      let newPage = currentPage + nbOfPagesShown;
      if (before){
        newPage = currentPage - nbOfPagesShown
      }

      this.set('currentPageToShow', newPage);
    }
  }
});
