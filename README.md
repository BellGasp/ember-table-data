# ember-table-data

[![npm version](https://badge.fury.io/js/ember-table-data.svg)](https://badge.fury.io/js/ember-table-data)
[![Ember Observer Score](https://emberobserver.com/badges/ember-table-data.svg)](https://emberobserver.com/addons/ember-table-data)
[![Build Status](https://travis-ci.org/BellGasp/ember-table-data.svg?branch=master)](https://travis-ci.org/BellGasp/ember-table-data)
[![Code Climate](https://codeclimate.com/github/BellGasp/ember-table-data/badges/gpa.svg)](https://codeclimate.com/github/BellGasp/ember-table-data)

## Description
This Ember Addon exposes an easily customizable table-data component. The component is mainly responsible for building a 'Query object' as of yet.

This addon is still a work in progress.

## Installation

Like most ember addons, simply run `ember install ember-table-data` and you should be all set.

## Docs

### Table-data
The Table-data component serves as the main container of the component. It's used to wrap the pagination/page-size component in the same container that the table in itself resides (Will eventually contain filters too).
It currently exposes 'pagination', 'pageSize' and 'table'.

| Property Key | Default Value | Type | Description |
|---|:-------------:|:------:|:-------------:|
| records | null (required) | [] or function | This is the way to get the data. Either you pass 'records' as an array directly, and then it'll paginate it locally (_not done yet_) or you pass a function returning a _promise_ that'll be called to get the data. A Query object is passed to the function, but you decide how you use it. If you've got any special case to do, usually you'd do it here.|

##### Example
```hbs
{{#table-data records=(action 'getData') as |tableData|}}
```
``` javascript
actions: {
    getData(queryObj){
      return this.get('store').query('data', queryObj);
    }
  }
```
#### Pagination

The `pagination` component is used to show the currently shown page and navigate to other pages.

Here are the parameters that are available.

| Property Key | Default Value | Type | Description |
|---|:-------------:|:------:|:-------------:|
| showFL | true | boolean | Shows first/last pagination buttons |
| showPN | true | boolean | Shows previous/next pagination buttons |
| showHasMore | true | boolean | Shows ... if some pages aren't shown |
| nbPagesToShow | 5 | int | Number of pages to show in pagination |

#### Page size

The `pageSize` component is used to select the number of records to show per page.

Here are the parameters that are available.

| Property Key | Default Value | Type | Description |
|---|:-------------:|:------:|:-------------:|
| pageSize | 10 | int | Selected (starting) page-size |
| pageSizes | [5, 10, 15, 25, 50, 100] | int array | Page-size options |

#### Table

The `table` component is the main component of the table-data. It's used to show to table in itself.
It exposes 'header' and 'body'.

#### Header

The `header` component is the equivalent of tHead, it wraps the header.
It exposes 'row'.

#### Body

The `body` component is the equivalent of tBody, it wraps all the records.
It exposes 'row', 'loadingRow', 'emptyRow' and record.

Here, loadingRow and emptyRow are 'row' components that are shown when either the records are loading or when there's no records to be shown.

##### Row

The 'row' component (both from header and body) is simply a table row (tr).

| Property Key | Default Value | Type |
|---|:-------------:|:------:|
| colspan | 1 | int |

##### Cell

The 'cell' component (both from header and body) is simply a table cell (td).

### Example
_Here's what a complete table-data would look like:_

```hbs
{{#table-data records=records as |tableData|}}
  <div class="row">
    {{tableData.pageSize class="col-2"}}
    {{tableData.pagination class="col-6"}}
  </div>

  {{#tableData.table class="table-striped col-12" as |table|}}
    {{#table.header as |header|}}
      {{#header.row as |row|}}
        {{#row.cell}}
          First cell
        {{/row.cell}}
        {{#row.cell}}
          Second cell
        {{/row.cell}}
        {{#row.cell}}
          Third cell
        {{/row.cell}}
      {{/header.row}}
    {{/table.header}}

    {{#table.body as |body record|}}

      {{#body.row as |row|}}
        {{#row.cell}}
          c1 {{record}}
        {{/row.cell}}
        {{#row.cell}}
          c2 {{record}}
        {{/row.cell}}
        {{#row.cell}}
          c3 {{record}}
        {{/row.cell}}
      {{/body.row}}

      {{#body.emptyRow as |row|}}
        {{#row.cell colspan=3}}
          No records
        {{/row.cell}}
      {{/body.emptyRow}}

      {{#body.loadingRow as |row|}}
        {{#row.cell colspan=3}}
          Loading records
        {{/row.cell}}
      {{/body.loadingRow}}

    {{/table.body}}
  {{/tableData.table}}
{{/table-data}}
```

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
