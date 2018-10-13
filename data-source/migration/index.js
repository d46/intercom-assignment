const dataSources = require('../data-sources-enum');
const migrationLatIndexed = require('./migrations/migrationLatIndexed');

Object.keys(dataSources).forEach(collectionName => {
  const collection = require(`../raw/${collectionName}`).default;
  migrationLatIndexed(collection, collectionName);
});
