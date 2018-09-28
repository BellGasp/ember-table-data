import { A } from '@ember/array';
import { computed } from '@ember/object';
import Component from '@ember/component';
import { isEmpty } from '@ember/utils';
import layout from '../../templates/components/core/page-size';

export default Component.extend({

  layout,

  classNames: ['page-size'],

  pageSizes: null,
  pageSize: null,

  _pageSize: 10,

  _defaultOptions: computed(function () {
    return [5, 10, 15, 25, 50, 100];
  }),

  _pageSizes: computed('_defaultOptions.[]', 'pageSizes.[]', function() {
    let pageSizes = A(this.get('pageSizes'));
    let defaultOptions = A(this.get('_defaultOptions'));
    return isEmpty(pageSizes) ? defaultOptions : pageSizes;
  }),

  didReceiveAttrs() {
    this._super(...arguments);

    let pageSize = this.get('pageSize');
    let pageSizes = this.get('_pageSizes');
    if (pageSize && pageSizes.includes(pageSize)) {
      this.set('_pageSize', this.get('pageSize'));
    } else {
      this.send('updatePageSize', this.get('_pageSizes.firstObject'));
    }
  },

  actions: {
    updatePageSize(pageSize) {
      this.set('_pageSize', pageSize);
      this.get('updatePageSize')(pageSize);
    }
  }

});
