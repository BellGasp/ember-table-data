import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('core/page-numbers', 'Integration | Component | core/page numbers', {
  integration: true
});

test('it renders with first/prev/next/last', function(assert) {
  assert.expect(5);

  this.set('queryObj', {
    currentPage: 1,
    pageSize: 5
  });
  this.set('totalCount', 5);

  this.render(hbs`{{core/page-numbers queryObj=queryObj totalCount=totalCount}}`);

  assert.equal(this.$('li').length, 5, 'Shows pages with [first, prev, 1, next, last]');
  assert.equal(this.$('li .fa-angle-double-left').length, 1, 'Shows go to first');
  assert.equal(this.$('li .fa-angle-left').length, 1, 'Shows go to prev');
  assert.equal(this.$('li .fa-angle-right').length, 1, 'Shows go to next');
  assert.equal(this.$('li .fa-angle-double-right').length, 1, 'Shows go to last');
});

test('it renders with more before and after', function(assert) {
  assert.expect(17);

  this.set('queryObj', {
    currentPage: 5,
    pageSize: 5
  });
  this.set('totalCount', 50);

  this.render(hbs`{{core/page-numbers queryObj=queryObj totalCount=totalCount}}`);

  assert.equal(this.$('li').length, 11, 'Shows pages with [first, prev, ..., 3, 4, 5, 6, 7,... next, last]');
  assert.equal(this.$('li .fa-angle-double-left').length, 1, 'Shows go to first');
  assert.equal(this.$('li .fa-angle-left').length, 1, 'Shows go to prev');
  assert.equal(this.$('li .fa-ellipsis-h').length, 2, 'Shows more before/after');
  assert.equal(this.$('li .fa-angle-right').length, 1, 'Shows go to next');
  assert.equal(this.$('li .fa-angle-double-right').length, 1, 'Shows go to last');

  assert.ok(this.$('li:eq(0) span').hasClass('fa-angle-double-left'), 'First is first');
  assert.ok(this.$('li:eq(1) span').hasClass('fa-angle-left'), 'Prev is second');
  assert.ok(this.$('li:eq(2) span').hasClass('fa-ellipsis-h'), '... is third');
  assert.ok(this.$('li:eq(3)').text().trim(), 3);
  assert.ok(this.$('li:eq(4)').text().trim(), 4);
  assert.ok(this.$('li:eq(5)').text().trim(), 5);
  assert.ok(this.$('li:eq(6)').text().trim(), 6);
  assert.ok(this.$('li:eq(7)').text().trim(), 7);
  assert.ok(this.$('li:eq(8) span').hasClass('fa-ellipsis-h'), '... is eight');
  assert.ok(this.$('li:eq(9) span').hasClass('fa-angle-right'), 'Next is ninth');
  assert.ok(this.$('li:eq(10) span').hasClass('fa-angle-double-right'), 'Last is tenth');
});

test('it renders with more before', function(assert) {
  assert.expect(16);

  this.set('queryObj', {
    currentPage: 5,
    pageSize: 5
  });
  this.set('totalCount', 35);

  this.render(hbs`{{core/page-numbers queryObj=queryObj totalCount=totalCount}}`);

  assert.equal(this.$('li').length, 10, 'Shows pages with [first, prev, ..., 3, 4, 5, 6, 7, next, last]');
  assert.equal(this.$('li .fa-angle-double-left').length, 1, 'Shows go to first');
  assert.equal(this.$('li .fa-angle-left').length, 1, 'Shows go to prev');
  assert.equal(this.$('li .fa-ellipsis-h').length, 1, 'Shows more before');
  assert.equal(this.$('li .fa-angle-right').length, 1, 'Shows go to next');
  assert.equal(this.$('li .fa-angle-double-right').length, 1, 'Shows go to last');

  assert.ok(this.$('li:eq(0) span').hasClass('fa-angle-double-left'), 'First is first');
  assert.ok(this.$('li:eq(1) span').hasClass('fa-angle-left'), 'Prev is second');
  assert.ok(this.$('li:eq(2) span').hasClass('fa-ellipsis-h'), '... is third');
  assert.ok(this.$('li:eq(3)').text().trim(), 3);
  assert.ok(this.$('li:eq(4)').text().trim(), 4);
  assert.ok(this.$('li:eq(5)').text().trim(), 5);
  assert.ok(this.$('li:eq(6)').text().trim(), 6);
  assert.ok(this.$('li:eq(7)').text().trim(), 7);
  assert.ok(this.$('li:eq(8) span').hasClass('fa-angle-right'), 'Next is eight');
  assert.ok(this.$('li:eq(9) span').hasClass('fa-angle-double-right'), 'Last is ninth');
});

test('it renders with more after', function(assert) {
  assert.expect(16);

  this.set('queryObj', {
    currentPage: 3,
    pageSize: 5
  });
  this.set('totalCount', 35);

  this.render(hbs`{{core/page-numbers queryObj=queryObj totalCount=totalCount}}`);

  assert.equal(this.$('li').length, 10, 'Shows pages with [first, prev, 3, 4, 5, 6, 7, ..., next, last]');
  assert.equal(this.$('li .fa-angle-double-left').length, 1, 'Shows go to first');
  assert.equal(this.$('li .fa-angle-left').length, 1, 'Shows go to prev');
  assert.equal(this.$('li .fa-ellipsis-h').length, 1, 'Shows more after');
  assert.equal(this.$('li .fa-angle-right').length, 1, 'Shows go to next');
  assert.equal(this.$('li .fa-angle-double-right').length, 1, 'Shows go to last');

  assert.ok(this.$('li:eq(0) span').hasClass('fa-angle-double-left'), 'First is first');
  assert.ok(this.$('li:eq(1) span').hasClass('fa-angle-left'), 'Prev is second');
  assert.ok(this.$('li:eq(2)').text().trim(), 1);
  assert.ok(this.$('li:eq(3)').text().trim(), 2);
  assert.ok(this.$('li:eq(4)').text().trim(), 3);
  assert.ok(this.$('li:eq(5)').text().trim(), 4);
  assert.ok(this.$('li:eq(6)').text().trim(), 5);
  assert.ok(this.$('li:eq(7) span').hasClass('fa-ellipsis-h'), '... is seventh');
  assert.ok(this.$('li:eq(8) span').hasClass('fa-angle-right'), 'Next is eight');
  assert.ok(this.$('li:eq(9) span').hasClass('fa-angle-double-right'), 'Last is ninth');
});

test('it renders without first/last', function(assert) {
  assert.expect(5);

  this.set('queryObj', {
    currentPage: 1,
    pageSize: 5
  });
  this.set('totalCount', 5);

  this.render(hbs`{{core/page-numbers queryObj=queryObj totalCount=totalCount showFL=false}}`);

  assert.equal(this.$('li').length, 3, 'Shows pages with [prev, 1, next]');
  assert.equal(this.$('li .fa-angle-double-left').length, 0, 'Does not show go to first');
  assert.equal(this.$('li .fa-angle-left').length, 1, 'Shows go to prev');
  assert.equal(this.$('li .fa-angle-right').length, 1, 'Shows go to next');
  assert.equal(this.$('li .fa-angle-double-right').length, 0, 'Does not show go to last');
});

test('it renders without prev/next', function(assert) {
  assert.expect(5);

  this.set('queryObj', {
    currentPage: 1,
    pageSize: 5
  });
  this.set('totalCount', 5);

  this.render(hbs`{{core/page-numbers queryObj=queryObj totalCount=totalCount showPN=false}}`);

  assert.equal(this.$('li').length, 3, 'Shows pages with [prev, 1, next]');
  assert.equal(this.$('li .fa-angle-double-left').length, 1, 'Shows go to first');
  assert.equal(this.$('li .fa-angle-left').length, 0, 'Does not show go to prev');
  assert.equal(this.$('li .fa-angle-right').length, 0, 'Does not show go to next');
  assert.equal(this.$('li .fa-angle-double-right').length, 1, 'Shows go to last');
});

test('it renders with only page numbers', function(assert) {
  assert.expect(6);

  this.set('queryObj', {
    currentPage: 5,
    pageSize: 5
  });
  this.set('totalCount', 50);

  this.render(hbs`{{core/page-numbers queryObj=queryObj totalCount=totalCount showPN=false showFL=false showHasMore=false}}`);

  assert.equal(this.$('li').length, 5, 'Shows pages with [3, 4, 5, 6, 7]');
  assert.equal(this.$('li .fa-angle-double-left').length, 0, 'Does not show go to first');
  assert.equal(this.$('li .fa-angle-left').length, 0, 'Does not show go to prev');
  assert.equal(this.$('li .fa-angle-right').length, 0, 'Does not show go to next');
  assert.equal(this.$('li .fa-angle-double-right').length, 0, 'Does not show go to last');
  assert.equal(this.$('li .fa-ellipsis-h').length, 0, 'Does not show has more before/after');
});

test('it renders with only 3 page shown', function(assert) {
  assert.expect(4);

  this.set('queryObj', {
    currentPage: 5,
    pageSize: 5
  });
  this.set('totalCount', 50);

  this.render(hbs`{{core/page-numbers queryObj=queryObj totalCount=totalCount showPN=false showFL=false showHasMore=false nbPagesToShow=3}}`);

  assert.equal(this.$('li').length, 3, 'Shows pages with [4, 5, 6]');
  assert.ok(this.$('li:eq(0)').text().trim(), 4);
  assert.ok(this.$('li:eq(1)').text().trim(), 5);
  assert.ok(this.$('li:eq(2)').text().trim(), 6);
});

test('it renders only 1 page', function(assert) {
  assert.expect(2);

  this.set('queryObj', {
    currentPage: 1,
    totalCount: 5,
    pageSize: 15
  });
  this.set('totalCount', 5);

  this.render(hbs`{{core/page-numbers queryObj=queryObj totalCount=totalCount showPN=false showFL=false showHasMore=false}}`);

  assert.equal(this.$('li').length, 1, 'Shows pages with [1]');
  assert.ok(this.$('li:eq(0)').text().trim(), 1);
});
