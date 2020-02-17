import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | core/page numbers', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with first/prev/next/last', async function(assert) {
    assert.expect(5);

    this.set('queryObj', {
      currentPage: 1,
      pageSize: 5
    });
    this.set('totalCount', 5);

    await render(hbs`{{core/page-numbers queryObj=queryObj totalCount=totalCount}}`);

    assert.equal(this.element.querySelectorAll('li').length, 5, 'Shows pages with [first, prev, 1, next, last]');
    assert.equal(this.element.querySelectorAll('li .goto-first').length, 1, 'Shows go to first');
    assert.equal(this.element.querySelectorAll('li .goto-previous').length, 1, 'Shows go to prev');
    assert.equal(this.element.querySelectorAll('li .goto-next').length, 1, 'Shows go to next');
    assert.equal(this.element.querySelectorAll('li .goto-last').length, 1, 'Shows go to last');
  });

  test('it renders with more before and after', async function(assert) {
    assert.expect(19);

    this.set('queryObj', {
      currentPage: 5,
      pageSize: 5
    });
    this.set('totalCount', 50);

    await render(hbs`{{core/page-numbers queryObj=queryObj totalCount=totalCount}}`);

    assert.equal(this.element.querySelectorAll('li').length, 13, 'Shows pages with [first, prev, firstPage, ..., 3, 4, 5, 6, 7,..., lastPage, next, last]');
    assert.equal(this.element.querySelectorAll('li .goto-first').length, 1, 'Shows go to first');
    assert.equal(this.element.querySelectorAll('li .goto-previous').length, 1, 'Shows go to prev');
    assert.equal(this.element.querySelectorAll('li .show-more').length, 2, 'Shows more before/after');
    assert.equal(this.element.querySelectorAll('li .goto-next').length, 1, 'Shows go to next');
    assert.equal(this.element.querySelectorAll('li .goto-last').length, 1, 'Shows go to last');

    assert.ok(this.element.querySelector('li:nth-child(1) span').classList.contains('goto-first'), 'First is first');
    assert.ok(this.element.querySelector('li:nth-child(2) span').classList.contains('goto-previous'), 'Prev is second');
    assert.ok(this.element.querySelector('li:nth-child(3)').textContent.trim(), 1, '... is third');
    assert.ok(this.element.querySelector('li:nth-child(4) span').classList.contains('show-more'), '... is third');
    assert.ok(this.element.querySelector('li:nth-child(5)').textContent.trim(), 3);
    assert.ok(this.element.querySelector('li:nth-child(6)').textContent.trim(), 4);
    assert.ok(this.element.querySelector('li:nth-child(7)').textContent.trim(), 5);
    assert.ok(this.element.querySelector('li:nth-child(8)').textContent.trim(), 6);
    assert.ok(this.element.querySelector('li:nth-child(9)').textContent.trim(), 7);
    assert.ok(this.element.querySelector('li:nth-child(10) span').classList.contains('show-more'), '... is eight');
    assert.ok(this.element.querySelector('li:nth-child(11)').textContent.trim(), 7);
    assert.ok(this.element.querySelector('li:nth-child(12) span').classList.contains('goto-next'), 'Next is ninth');
    assert.ok(this.element.querySelector('li:nth-child(13) span').classList.contains('goto-last'), 'Last is tenth');
  });

  test('it renders with more before', async function(assert) {
    assert.expect(17);

    this.set('queryObj', {
      currentPage: 5,
      pageSize: 5
    });
    this.set('totalCount', 35);

    await render(hbs`{{core/page-numbers queryObj=queryObj totalCount=totalCount}}`);

    assert.equal(this.element.querySelectorAll('li').length, 11, 'Shows pages with [first, prev, firstPage, ..., 3, 4, 5, 6, 7, next, last]');
    assert.equal(this.element.querySelectorAll('li .goto-first').length, 1, 'Shows go to first');
    assert.equal(this.element.querySelectorAll('li .goto-previous').length, 1, 'Shows go to prev');
    assert.equal(this.element.querySelectorAll('li .show-more').length, 1, 'Shows more before');
    assert.equal(this.element.querySelectorAll('li .goto-next').length, 1, 'Shows go to next');
    assert.equal(this.element.querySelectorAll('li .goto-last').length, 1, 'Shows go to last');

    assert.ok(this.element.querySelector('li:nth-child(1) span').classList.contains('goto-first'), 'First is first');
    assert.ok(this.element.querySelector('li:nth-child(2) span').classList.contains('goto-previous'), 'Prev is second');
    assert.ok(this.element.querySelector('li:nth-child(3)').textContent.trim(), 1);
    assert.ok(this.element.querySelector('li:nth-child(4) span').classList.contains('show-more'), '... is third');
    assert.ok(this.element.querySelector('li:nth-child(5)').textContent.trim(), 3);
    assert.ok(this.element.querySelector('li:nth-child(6)').textContent.trim(), 4);
    assert.ok(this.element.querySelector('li:nth-child(7)').textContent.trim(), 5);
    assert.ok(this.element.querySelector('li:nth-child(8)').textContent.trim(), 6);
    assert.ok(this.element.querySelector('li:nth-child(9)').textContent.trim(), 7);
    assert.ok(this.element.querySelector('li:nth-child(10) span').classList.contains('goto-next'), 'Next is eight');
    assert.ok(this.element.querySelector('li:nth-child(11) span').classList.contains('goto-last'), 'Last is ninth');
  });

  test('it renders with more after', async function(assert) {
    assert.expect(17);

    this.set('queryObj', {
      currentPage: 3,
      pageSize: 5
    });
    this.set('totalCount', 35);

    await render(hbs`{{core/page-numbers queryObj=queryObj totalCount=totalCount}}`);

    assert.equal(this.element.querySelectorAll('li').length, 11, 'Shows pages with [first, prev, 3, 4, 5, 6, 7, ..., lastPage, next, last]');
    assert.equal(this.element.querySelectorAll('li .goto-first').length, 1, 'Shows go to first');
    assert.equal(this.element.querySelectorAll('li .goto-previous').length, 1, 'Shows go to prev');
    assert.equal(this.element.querySelectorAll('li .show-more').length, 1, 'Shows more after');
    assert.equal(this.element.querySelectorAll('li .goto-next').length, 1, 'Shows go to next');
    assert.equal(this.element.querySelectorAll('li .goto-last').length, 1, 'Shows go to last');

    assert.ok(this.element.querySelector('li:nth-child(1) span').classList.contains('goto-first'), 'First is first');
    assert.ok(this.element.querySelector('li:nth-child(2) span').classList.contains('goto-previous'), 'Prev is second');
    assert.ok(this.element.querySelector('li:nth-child(3)').textContent.trim(), 1);
    assert.ok(this.element.querySelector('li:nth-child(4)').textContent.trim(), 2);
    assert.ok(this.element.querySelector('li:nth-child(5)').textContent.trim(), 3);
    assert.ok(this.element.querySelector('li:nth-child(6)').textContent.trim(), 4);
    assert.ok(this.element.querySelector('li:nth-child(7)').textContent.trim(), 5);
    assert.ok(this.element.querySelector('li:nth-child(8) span').classList.contains('show-more'), '... is seventh');
    assert.ok(this.element.querySelector('li:nth-child(9)').textContent.trim(), 5);
    assert.ok(this.element.querySelector('li:nth-child(10) span').classList.contains('goto-next'), 'Next is eight');
    assert.ok(this.element.querySelector('li:nth-child(11) span').classList.contains('goto-last'), 'Last is ninth');
  });

  test('it renders without first/last', async function(assert) {
    assert.expect(5);

    this.set('queryObj', {
      currentPage: 1,
      pageSize: 5
    });
    this.set('totalCount', 5);

    await render(hbs`{{core/page-numbers queryObj=queryObj totalCount=totalCount showFL=false}}`);

    assert.equal(this.element.querySelectorAll('li').length, 3, 'Shows pages with [prev, 1, next]');
    assert.equal(this.element.querySelectorAll('li .goto-first').length, 0, 'Does not show go to first');
    assert.equal(this.element.querySelectorAll('li .goto-previous').length, 1, 'Shows go to prev');
    assert.equal(this.element.querySelectorAll('li .goto-next').length, 1, 'Shows go to next');
    assert.equal(this.element.querySelectorAll('li .goto-last').length, 0, 'Does not show go to last');
  });

  test('it renders without prev/next', async function(assert) {
    assert.expect(5);

    this.set('queryObj', {
      currentPage: 1,
      pageSize: 5
    });
    this.set('totalCount', 5);

    await render(hbs`{{core/page-numbers queryObj=queryObj totalCount=totalCount showPN=false}}`);

    assert.equal(this.element.querySelectorAll('li').length, 3, 'Shows pages with [prev, 1, next]');
    assert.equal(this.element.querySelectorAll('li .goto-first').length, 1, 'Shows go to first');
    assert.equal(this.element.querySelectorAll('li .goto-previous').length, 0, 'Does not show go to prev');
    assert.equal(this.element.querySelectorAll('li .goto-next').length, 0, 'Does not show go to next');
    assert.equal(this.element.querySelectorAll('li .goto-last').length, 1, 'Shows go to last');
  });

  test('it renders with only page numbers', async function(assert) {
    assert.expect(6);

    this.set('queryObj', {
      currentPage: 5,
      pageSize: 5
    });
    this.set('totalCount', 50);

    await render(
      hbs`{{core/page-numbers queryObj=queryObj totalCount=totalCount showPN=false showFL=false showHasMore=false}}`
    );

    assert.equal(this.element.querySelectorAll('li').length, 5, 'Shows pages with [3, 4, 5, 6, 7]');
    assert.equal(this.element.querySelectorAll('li .goto-first').length, 0, 'Does not show go to first');
    assert.equal(this.element.querySelectorAll('li .goto-previous').length, 0, 'Does not show go to prev');
    assert.equal(this.element.querySelectorAll('li .goto-next').length, 0, 'Does not show go to next');
    assert.equal(this.element.querySelectorAll('li .goto-last').length, 0, 'Does not show go to last');
    assert.equal(this.element.querySelectorAll('li .show-more').length, 0, 'Does not show has more before/after');
  });

  test('it renders with only 3 page shown', async function(assert) {
    assert.expect(4);

    this.set('queryObj', {
      currentPage: 5,
      pageSize: 5
    });
    this.set('totalCount', 50);

    await render(
      hbs`{{core/page-numbers queryObj=queryObj totalCount=totalCount showPN=false showFL=false showHasMore=false nbPagesToShow=3}}`
    );

    assert.equal(this.element.querySelectorAll('li').length, 3, 'Shows pages with [4, 5, 6]');
    assert.ok(this.element.querySelector('li').textContent.trim(), 4);
    assert.ok(this.element.querySelector('li:nth-child(1)').textContent.trim(), 5);
    assert.ok(this.element.querySelector('li:nth-child(2)').textContent.trim(), 6);
  });

  test('it renders only 1 page', async function(assert) {
    assert.expect(2);

    this.set('queryObj', {
      currentPage: 1,
      totalCount: 5,
      pageSize: 15
    });
    this.set('totalCount', 5);

    await render(
      hbs`{{core/page-numbers queryObj=queryObj totalCount=totalCount showPN=false showFL=false showHasMore=false}}`
    );

    assert.equal(this.element.querySelectorAll('li').length, 1, 'Shows pages with [1]');
    assert.ok(this.element.querySelector('li').textContent.trim(), 1);
  });
});
