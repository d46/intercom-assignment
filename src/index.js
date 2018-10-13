import customers32 from '../data-source/raw/customersIn500km';
import customers2k from '../data-source/raw/customers2kIn500km';
import customers20k from '../data-source/raw/customers20kIn500km';

import customers32LatIndexed from '../data-source/lat-indexed/customersIn500kmLatIndexed';
import customers2kLatIndexed from '../data-source/lat-indexed/customers2kIn500kmLatIndexed';
import customers20kLatIndexed from '../data-source/lat-indexed/customers20kIn500kmLatIndexed';

import searchDistanceWithRangeBruteForce from './search/distance/range/brute-force';
import searchDistanceWithRangeBinary from './search/distance/range/binary';

const searchBruteForce = (collection) => {
  const distance = 1000 * 100; // 1km
  const searchPoint =  {
    latitude: 51.92893,
    longitude: -5.27699
  };
  return searchDistanceWithRangeBruteForce(
    searchPoint,
    distance,
    collection,
    {
      pointLatKey: 'latitude',
      pointLonKey: 'longitude'
    }
  );    
}

const binarySearch = (collection) => {
  const distance = 1000 * 111; // 111km
  const searchPoint =  {
    latitude: 53.125453,
    longitude: -8.295377
  }
  return searchDistanceWithRangeBinary(
    searchPoint,
    distance,
    collection,
    {
      pointLatKey: 'latitude',
      pointLonKey: 'longitude'
    }
  ); 
}

binarySearch(customers20kLatIndexed)
