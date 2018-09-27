export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).
    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:
    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');
    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */

  this.timing = 0;

  this.get('/characters', recordsFor('characters', [
    filter(['name', 'age', 'evil']),
    sort(),
    paginate()
  ]));

  this.get('/animals', recordsFor('animals', [
    filter(['name', 'age', 'species']),
    sort(),
    paginate()
  ]));
}

function recordsFor(resourceName, transforms=[]) {
  return (schema, request) => {
    let records = schema[resourceName].all();

    transforms.forEach(transform => {
      records = transform(records, request);
    });

    return records;
  };
}

function filter(properties) {
  return (records, request) => {
    let filteredRecords = records;

    properties.forEach(property => {
      let key = `filter[${property}]`;
      let value = request.queryParams[key];

      if (value) {
        let matcher = new RegExp(value, 'gi');
        filteredRecords = filteredRecords.filter(record => matcher.test(record[property]));
      }
    });

    return filteredRecords;
  };
}

function sort() {
  return (records, request) => {
    let sortedRecords = records;

    const parameter = request.queryParams['sort'];

    if (parameter) {
      const properties = parameter.split(',').map(string => ({
        key: string.replace(/-/, ''),
        asc: !string.includes('-')
      }));

      properties.forEach(property => {
        sortedRecords = sortedRecords.sort(sortObjects(property.key, !property.asc));
      });
    }

    return sortedRecords;
  };
}

function paginate() {
  return (records, request) => {
    let page = request.queryParams['page[number]'] || request.queryParams['currentPage'];
    let pageSize = request.queryParams['page[size]'] || request.queryParams['pageSize'];

    let total = records.models.length;

    let start = (page - 1) * pageSize;
    let end = (page) * pageSize;

    let paginatedRecords = records.slice(start, end);

    paginatedRecords.meta = { totalCount: total };

    return paginatedRecords;
  };
}

function sortObjects(key, reverse) {
  return function(a, b) {
    if (typeof a[key] === 'number') {
      return (a[key] - b[key]);
    }

    if (a[key] < b[key]) {
      return reverse ? 1 : -1;
    }

    if (a[key] > b[key]) {
      return reverse ? -1 : 1;
    }

    return 0;
  };
}