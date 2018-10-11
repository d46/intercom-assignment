import _customers32 from '../data-source/customersIn500km';
const customers32 = _customers32.default
import _customers2k from '../data-source/customers2kIn500km';
const customers2k = _customers2k.default
import _customers20k from '../data-source/customers20kIn500km';
const customers20k = _customers20k.default

import _customers32LatIndexed from '../data-source/customersIn500kmLatIndexed';
const customers32LatIndexed = _customers32LatIndexed.default;
import _customers2kLatIndexed from '../data-source/customers2kIn500kmLatIndexed';
const customers2kLatIndexed = _customers2kLatIndexed.default;
import _customers20kLatIndexed from '../data-source/customers20kIn500kmLatIndexed';
const customers20kLatIndexed = _customers20kLatIndexed.default;

import bruteForce from './brute-force';
import binarySearch from './binary-search';


class App {
  constructor() {
    this.binary20kCustomer();
  }
  bruteForce32Customer() {
    const distance = 1000 * 100; // 1km
    return bruteForce({
      searchPoint: {
        latitude: 51.92893,
        longitude: -5.27699
      },
      distance,
      customers: customers32
    });    
  }

  bruteForce2kCustomer() {
    const distance = 1000 * 100; // 1km
    return bruteForce({
      searchPoint: {
        latitude: 51.92893,
        longitude: -5.27699
      },
      distance,
      customers: customers2k
    });    
  }

  bruteForce20kCustomer() {
    const distance = 1000 * 100; // 1km
    return bruteForce({
      searchPoint: {
        latitude: 51.92893,
        longitude: -5.27699
      },
      distance,
      customers: customers20k
    });    
  }

  binary32Customer() {
    const distance = 1000 * 111; // 111km
    const searchPoint =  {
      latitude: 51.92893,
      longitude: -6.043701
    }
    return binarySearch(
      searchPoint,
      distance,
      customers32LatIndexed
    ); 
  }

  binary2kCustomer() {
    const distance = 1000 * 111; // 111km
    const searchPoint =  {
      latitude: 53.125453,
      longitude: -8.295377
    }
    return binarySearch(
      searchPoint,
      distance,
      customers2kLatIndexed
    ); 
  }


  binary20kCustomer() {
    const distance = 1000 * 111; // 111km
    const searchPoint =  {
      latitude: 53.125453,
      longitude: -8.295377
    }
    return binarySearch(
      searchPoint,
      distance,
      customers20kLatIndexed
    ); 
  }
}

export default new App()
