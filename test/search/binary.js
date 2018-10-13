import test from 'ava';
import customers32LatIndexed from '../../data-source/lat-indexed/customersIn500kmLatIndexed';
import searchDinstanceWithRangeBinary from '../../src/search/distance/range/binary';
import { getUnitLatDistance } from '../../src/util/distance';

test('searchDinstanceWithRangeBinary', t => {
  const distance = getUnitLatDistance();
  const searchPoint = {
    latitude: 51.92893,
    longitude: -6.043701
  }
  const customers = searchDinstanceWithRangeBinary(
    searchPoint, 
    distance, 
    customers32LatIndexed,
    {
      indexKey: "indexes",
      collectionKey: "customers",
      pointLatKey: "latitude",
      pointLonKey: "longitude"
    }
  ); 
	t.deepEqual(customers[0].user_id, 10);
});
