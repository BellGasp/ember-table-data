import Ember from 'ember';
import layout from '../../../templates/components/core/page-numbers/page-link';

const { computed } = Ember;

export default Ember.Component.extend({
  layout,
  tagName: 'li',

  classNames: ['page-item'],
  classNameBindings: ['isDisabled:disabled', 'isActive:active'],

  disabled: null,
  currentPage: null,
  page: null,

  isActive: computed('currentPage', 'page', function () {
    return this.get('page') === this.get('currentPage');
  }),

  actions: {
    triggerAction() {
      this.get('action')(this.get('page'));
    }
  }
});
