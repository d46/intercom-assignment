const dataSources = require('../data-sources-enum');
const migrationLatIndexed = require('./migrations/migrationLatIndexed');
const migrationLatLonIndexed = require('./migrations/migrationLatLonIndexed');

Object.keys(dataSources).forEach(collectionName => {
  const collection = require(`../raw/${collectionName}`);
  migrationLatIndexed(collection, collectionName);
  migrationLatLonIndexed(collection, collectionName);
});
