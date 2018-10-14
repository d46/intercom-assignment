const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const { absFloor } = require('../../utils/math')

module.exports = (collection, collectionName) => {
  
  // Create directory
  const migPath = path.join('data-source', 'lat-lon-indexed-scale-10');
  mkdirp.sync(migPath);

  // Collect data for new data structure
  let newStructure = collection.reduce((acc, customer)=> {
    
    if (!acc.hasOwnProperty('latIndexes')) acc.latIndexes = [];
    if (!acc.hasOwnProperty('lonIndexes')) acc.lonIndexes = [];
    
    // Populate indexes with rolled lat
    
    const lat = absFloor(+customer.latitude * 10);
    if (!acc.latIndexes.includes(lat)) {
      acc.latIndexes.push(lat)
    }

    const lon = absFloor(+customer.longitude * 10);
    if (!acc.lonIndexes.includes(lon)) {
      acc.lonIndexes.push(lon)
    }
    
    if (!acc.hasOwnProperty('customers')) acc.customers = {};
    if (!acc.customers.hasOwnProperty(lat)) acc.customers[lat] = {};
    if (!acc.customers[lat].hasOwnProperty(lon)) acc.customers[lat][lon] = [];
    
    acc.customers[lat][lon].push(customer);
    return acc;
  },{});
  
  // Sort indexes
  newStructure.latIndexes = newStructure.latIndexes.sort((indexA, indexB) => indexA - indexB);
  newStructure.lonIndexes = newStructure.lonIndexes.sort((indexA, indexB) => indexA - indexB);
  
  // Write as a new file
  newStructure = `module.exports = ${JSON.stringify(newStructure, null, 4)}`
  fs.writeFile(`${migPath}/${collectionName}LatLonIndexed.js`, newStructure, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
  });

};


