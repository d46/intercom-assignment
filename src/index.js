import _customers32 from '../data-source/customersIn100km';
const customers32 = _customers32.default
import _customers2k from '../data-source/customers2kIn200km';
const customers2k = _customers2k.default
import _customers90k from '../data-source/customers90kIn200km';
const customers90k = _customers90k.default


import bruteForce from './brute-force';

class App {
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

  bruteForce90kCustomer() {
    const distance = 1000 * 100; // 1km
    return bruteForce({
      searchPoint: {
        latitude: 51.92893,
        longitude: -5.27699
      },
      distance,
      customers: customers90k
    });    
  }

}

export default new App()
