import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../../../templates/components/core/page-numbers/page-link';

export default Component.extend({
  layout,
  tagName: 'li',

  classNames: ['page-item'],
  classNameBindings: ['isDisabled:disabled', 'isActive:active'],

  isDisabled: null,
  currentPage: null,
  page: null,

  isActive: computed('currentPage', 'page', function () {
    let page = this.get('page');
    let currentPage = this.get('currentPage');
    return page && page === currentPage;
  }),

  actions: {
    triggerAction() {
      this.get('action')(this.get('page'));
    }
  }
});
