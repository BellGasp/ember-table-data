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
    getData(queryObj, defaultSerializedObject){
      return this.get('store').query('data', queryObj);
    }
  }
```
The defaultSerializedObject is a object serialize for C# API that will be able to deserialize a array object for the filters. The queryObj is provider if you want to format it differently.

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

#### Filters

The 'filter' component is exposed if you want to have the filter options visible.
The filter componet is used as a block component. It expose 3 component: 'header', 'body' and 'footer'.

Here are the parameters that are available.

| Properties | Default Value | Type | Description |
|---|:-------------:|:------:|:-------------:|
| properties | new Ember array | array | Represent the available properties to be able to filter |
| comparators | see below the default comparators | array | Represent the comparator to override or be add to the default comparators |  

We provide the filter-object in the utils. The filter-object contain 4 property:
| label | Represent the label that will be show in the dropdown to select the property for filter |
| propertyType | Represent the type of the property to filter comparators |
|  valueForQuery | Represent the value that will be used when we will construct the serializeObject |

Here an exemple of the properties array :
```javascript
import filterObject from 'ember-table-data/utils/filter-object';
[...]
properties: computed('i18n.locale', function () {
    let array = new A();
    array.pushObject(filterObject.create({ label:'Label to be display in the dropdown', propertyType:'string',
      valueForQuery:'Label1' }));
    array.pushObject(filterObject.create({ label:'Label 2 to be display in the dropdown', propertyType:'number',
      valueForQuery:'Label2' }));
    array.pushObject(filterObject.create({ label:'Label 3 to be display in the dropdown', propertyType:'boolean',
      valueForQuery:'Label3.Code' }));
    array.pushObject(filterObject.create({ label:'Label 4 to be display in the dropdown', propertyType:'date',
      valueForQuery:'Label4' }));
    return array;
  }),
```
##### Comparators

We provide a default list of comparators for each time. When you want to add a comparator of modify one existing, you need to provide a list of comparator-object available in the utils.
| label | Represent the label that will be show in the dropdown to select the comparator for filter |
| internalName | Represent the unique name for a specific type |
| propertyType | Represent the type of the property |
| valueForQuery | Represent the value that will be used when we will construct the serializeObject |

Here the available default comparators :
```javascript
import ComparatorObject from 'ember-table-data/utils/comparator-object';
[...]
new A([
  ComparatorObject.create({label: 'Contains', internalName: 'contains', propertyType: 'string', valueForQuery:'{0}.Contains("{1}")'}),
  ComparatorObject.create({label: 'Ends with', internalName: 'endsWith', propertyType: 'string', valueForQuery:'{0}.EndsWith("{1}")'}),
  ComparatorObject.create({label: 'Equal', internalName: 'equal', propertyType: 'string', valueForQuery:'{0} == "{1}"'}),
  ComparatorObject.create({label: 'Not contains', internalName: 'notContains', propertyType: 'string', valueForQuery:'!({0}.Contains("{1}"))'}),
  ComparatorObject.create({label: 'Not ends with', internalName: 'notEndsWith', propertyType: 'string', valueForQuery:'!({0}.EndsWith("{1}"))'}),
  ComparatorObject.create({label: 'Not equal', internalName: 'notEqual', propertyType: 'string', valueForQuery:'{0} != "{1}"'}),
  ComparatorObject.create({label: 'Not starts with', internalName: 'notStartsWith', propertyType: 'string', valueForQuery:'!({0}.StartsWith("{1}"))'}),
  ComparatorObject.create({label: 'Starts with', internalName: 'startsWith', propertyType: 'string', valueForQuery:'{0}.StartsWith("{1}")'}),

  ComparatorObject.create({label: '<>', internalName: 'notEqual', propertyType: 'number', valueForQuery:'{0} != {1}'}),
  ComparatorObject.create({label: '<', internalName: 'lessThan', propertyType: 'number', valueForQuery:'{0} < {1}'}),
  ComparatorObject.create({label: '<=', internalName: 'lessThanOrEqual', propertyType: 'number', valueForQuery:'{0} <= {1}'}),
  ComparatorObject.create({label: '=', internalName: 'equal', propertyType: 'number', valueForQuery:'{0} == {1}'}),
  ComparatorObject.create({label: '>', internalName: 'greaterThan', propertyType: 'number', valueForQuery:'{0} > {1}'}),
  ComparatorObject.create({label: '>=', internalName: 'greaterThanOrEqual', propertyType: 'number', valueForQuery:'{0} >= {1}'}),

  ComparatorObject.create({label: '<>', internalName: 'notEqual', propertyType: 'date', valueForQuery:'{0} != {1}'}),
  ComparatorObject.create({label: '<', internalName: 'lessThan', propertyType: 'date', valueForQuery:'{0} < {1}'}),
  ComparatorObject.create({label: '<=', internalName: 'lessThanOrEqual', propertyType: 'date', valueForQuery:'{0} <= {1}'}),
  ComparatorObject.create({label: '=', internalName: 'equal', propertyType: 'date', valueForQuery:'{0} == {1}'}),
  ComparatorObject.create({label: '>', internalName: 'greaterThan', propertyType: 'date', valueForQuery:'{0} > {1}'}),
  ComparatorObject.create({label: '>=', internalName: 'greaterThanOrEqual', propertyType: 'date', valueForQuery:'{0} >= {1}'}),

  ComparatorObject.create({label: '<>', internalName: 'noEqual', propertyType: 'boolean', valueForQuery:'{0} != {1}'}),
  ComparatorObject.create({label: '=', internalName: 'equal', propertyType: 'boolean', valueForQuery:'{0} == {1}'})
]);
```
###### Override an comparators

If you provide a list of comparators in the filters, we will match the internalName and the type. If you provide a label and/or a valueForQuery, we will override the default one with the new value.

If you use a globalization system, do not forget to make a computed that watch the locale for your new comparators to have the label change when change language.

```hbs
{{#tableData.filter properties=properties comparators=userComparators as |filter|}}
```

##### Header

The 'header' component exposed in the filter component is used to display the Add row button. The addButton will be generate as a button. The click function will add 1 row to the filter list.

```hbs
{{#filter.header as |header|}}
  {{#header.addButton }}
    Can be block component or not.
  {{/header.addButton}}
{{/filter.header}}
```

##### Body / Row

The 'body' and 'row' component expose the 'property', 'comparator', 'value' and 'deleteButton' component.
The 'property' component is used to display the property dropdown to be filter on.
The 'comparator' component is used to display the comparator list base on the type of the property selected.
The 'value' component is used to display the input to select the value for the filter.
The 'deleteButton' is used to display a button that will delete the row from the filters. This component render with button tag.

The 'row' component expose the count of the filters. You can use that to have logical display on the deleteButton component. In the case below, we display the delete button only if 2 filter or more are in the list.

```hbs
{{#filter.body as |body|}}
  {{#body.row as |row|}}
    {{row.property }}
    {{row.comparator }}
    {{row.value }}
    {{#if (gt row.count 1)}}
      {{#row.deleteButton }}
        You can add Text or Icon here for the delete button.
      {{/row.deleteButton}}
    {{/if}}
  {{/body.row}}
{{/filter.body}}

```

###### Override input value control

You can override or create input value for current or custom propertyType. The component will search in the components/filter-input/PROPERTYTYPE. We provide default input for each type.
The string type will generate a input with the input helper with the type text.
The number type will generate a input with the input helper with the type number.
The date type will generate a input with the input helper with the type date.
The boolean type will generate a input with the input helper with the type boolean.

When you override a input value, you need to execute the provide action when the value change. The component receive a closure action named 'valueChange' that need to be executed when value is changed to update the filter object. The action receive the value as a parameter. So when the value as changed, you need to call the action. See the example below.

```javascript
{
[...]
this.get('valueChange')("THE NEW VALUE");
}
```

If you want the override or add component, you can use the ember cli command : ember g component filter-input/PROPERTYTYPE.
Do not forget to prove the appropriated comprator if you use custom 'propertyType'.

##### Footer

The 'footer' component expose the 'filterButton' and the 'clearButton'.
The 'filterButton' will trigger the getData action to send the call with the new queryObj. It will also remove all the invalid filter from the list. The invalid filter are the filter row that comparator or value or property are not defined.
The 'clearButton' will clear the filter list and trigger the getData action with the new queryObj.

```hbs
{{#filter.footer as |footer| }}
  {{#footer.filterButton}}
    Can be text or icon.
  {{/footer.filterButton}}
  {{#footer.clearButton }}
    Can be text or icon.
  {{/footer.clearButton}}
{{/filter.footer}}
```

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
  {{#tableData.filter properties=properties  as |filter|}}
    {{#filter.header as |header|}}
      {{#header.addButton }}
        Can be block component or not.
      {{/header.addButton}}
    {{/filter.header}}

    {{#filter.body as |body|}}
      {{#body.row as |row|}}
        {{row.property }}
        {{row.comparator }}
        {{row.value }}
        {{#if (gt row.count 1)}}
          {{#row.deleteButton}}
            can be block component or not.
          {{/row.deleteButton}}
        {{/if}}
      {{/body.row}}
    {{/filter.body}}

    {{#filter.footer as |footer| }}
          {{#footer.filterButton }}
            Can be block component or not.
          {{/footer.filterButton}}
          {{#footer.clearButton }}
            Can be block component or not.
          {{/footer.clearButton}}
    {{/filter.footer}}
  {{/tableData.filter}}

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
