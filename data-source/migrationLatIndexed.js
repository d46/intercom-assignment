const customersIn500km = require('./customersIn500km').default;
const fs = require('fs');

let newStructure = customersIn500km.reduce((acc, customer)=> {
  // Populate indexes with rolled lat
  if (!acc.hasOwnProperty('indexes')) acc.indexes = [];
  const lat = Math.floor(+customer.latitude);
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
newStructure = `exports.default = ${JSON.stringify(newStructure, null, 4)}`
fs.writeFile('./data-source/customersIn500kmLatIndexed.js', newStructure, (err) => {
  if(err) {
      return console.log(err);
  }
  console.log("The file was saved!");
}); 
