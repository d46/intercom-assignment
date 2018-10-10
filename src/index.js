import _customers from '../data-source/customersIn100km';
const customers = _customers.default
import bruteForce from './brute-force';

class App {
  bruteForce() {
    const distance = 1000 * 100; // 1km
    return bruteForce({
      searchPoint: {
        latitude: 51.92893,
        longitude: -5.27699
      },
      distance,
      customers
    });    
  }
}

export default new App()
