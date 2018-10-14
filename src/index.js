import customersIn500kmLatLonIndexed from '../data-source/lat-lon-indexed/customersIn500kmLatLonIndexed';
import searchDistanceWithRangeBinary2d from './search/distance/range/binary2d';
import { getUnitLatDistance } from './util/distance';

const distance = getUnitLatDistance(); // ~111km
const binarySearch2d = (collection) => {
  const searchPoint =  {
    latitude: 53.339428,
    longitude: -6.257664
  }
  return searchDistanceWithRangeBinary2d(
    searchPoint,
    distance,
    collection,
    {
      indexLatKey: 'latIndexes',
      indexLonKey: 'lonIndexes', 
      collectionKey: 'customers',
      pointLatKey: 'latitude',
      pointLonKey: 'longitude'
    }
  ); 
};

const timeA = process.hrtime();
const customers = binarySearch2d(customersIn500kmLatLonIndexed)
const timeB = process.hrtime(timeA);

process.stdout.write(`
\u001b[2J\u001b[0;0H

`);
console.log(customers.sort((a , b) => a.user_id - b.user_id ));
console.log(`
Searched on 32 points with ${Math.floor(distance)}m ranged.`);
console.info('Execution time (hr): %ds %dms', timeB[0], timeB[1] / 1000000)

console.log(`
Used 2d binary search. Checkout for other benchmarks 
with 'npm run bench:compare'

Extra arguments will filter
Eg. npm run bench:compare Brute
    npm run bench:compare 20k .sync
`);
