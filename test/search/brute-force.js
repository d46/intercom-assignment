import test from 'ava';
import customersIn500km from '../../data-source/raw/customersIn500km';
import searchDinstanceWithRangeBruteForce from '../../src/search/distance/range/brute-force';
import { getUnitLatDistance } from '../../src/util/distance';

test('searchDinstanceWithRangeBruteForce', t => {
  const distance = getUnitLatDistance();
  const searchPoint = {
    latitude: 51.92893,
    longitude: -6.043701
  }
  const customers = searchDinstanceWithRangeBruteForce(
    searchPoint, 
    distance, 
    customersIn500km,
    {
      pointLatKey: 'latitude',
      pointLonKey: 'longitude'
    }
  ); 

	t.deepEqual(customers[0].user_id, 10);
});
