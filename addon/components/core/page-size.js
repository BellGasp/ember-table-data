import Ember from 'ember';
import layout from '../../templates/components/core/page-size';

const {
  computed,
  on,
  Component,
  isEmpty
} = Ember;

export default Component.extend({
  layout,
  classNames: ['page-size'],
  _defaultOptions: [5, 10, 15, 25, 50, 100],
  _pageSize: 10,

  _pageSizes: computed('_defaultOptions.[]', 'pageSizes.[]', function() {
    let pageSizes = Ember.A(this.get('pageSizes'));
    let defaultOptions = Ember.A(this.get('_defaultOptions'));
    return isEmpty(pageSizes) ? defaultOptions : pageSizes;
  }),

  pageSizes: null,
  pageSize: null,

  setupPageSizes: on('didReceiveAttrs', function () {
    let pageSize = this.get('pageSize');
    let pageSizes = this.get('_pageSizes');
    if (pageSize && pageSizes.includes(pageSize)) {
      this.set('_pageSize', this.get('pageSize'));
    } else {
      this.send('updatePageSize', this.get('_pageSizes.firstObject'));
    }
  }),
  actions: {
    updatePageSize(pageSize) {
      this.set('_pageSize', pageSize);
      this.get('updatePageSize')(pageSize);
    }
  }
});
