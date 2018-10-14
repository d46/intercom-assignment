const dataSources = require('../data-sources-enum');
const migrationLatIndexed = require('./migrations/migrationLatIndexed');
const migrationLatLonIndexed = require('./migrations/migrationLatLonIndexed');
const migrationLatLonIndexedScale10 = require('./migrations/migrationLatLonIndexedScale10');

Object.keys(dataSources).forEach(collectionName => {
  const collection = require(`../raw/${collectionName}`);
  migrationLatIndexed(collection, collectionName);
  migrationLatLonIndexed(collection, collectionName);
  migrationLatLonIndexedScale10(collection, collectionName);
});
