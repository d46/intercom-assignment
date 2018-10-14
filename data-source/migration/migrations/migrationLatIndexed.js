const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const { absFloor } = require('../../utils/math');

module.exports = (collection, collectionName) => {
  
  // Create directory
  const migPath = path.join('data-source', 'lat-indexed');
  mkdirp.sync(migPath);

  // Collect data for new data structure
  let newStructure = collection.reduce((acc, customer)=> {
    // Populate indexes with rolled lat
    if (!acc.hasOwnProperty('indexes')) acc.indexes = [];
    const lat = absFloor(+customer.latitude);
    if (!acc.indexes.includes(lat)) {
      acc.indexes.push(lat)
    }
    
    if (!acc.hasOwnProperty('customers')) acc.customers = {};
    if (!acc.customers.hasOwnProperty(lat)) acc.customers[lat] = [];
  
    acc.customers[lat].push(customer);
    return acc;
  },{});
  
  // Sort indexes
  newStructure.indexes = newStructure.indexes.sort((indexA, indexB) => indexA - indexB);
  
  // Write as a new file
  newStructure = `module.exports = ${JSON.stringify(newStructure, null, 4)}`
  fs.writeFile(`${migPath}/${collectionName}LatIndexed.js`, newStructure, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
  });

};


