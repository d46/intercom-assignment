import test from 'ava';
import customersIn500km from '../../data-source/raw/customersIn500km';
import searchDinstanceWithRangeBruteForce from '../../src/search/distance/range/brute-force';
import { getUnitLatDistance } from '../../src/util/distance';

test('searchDinstanceWithRangeBruteForce', t => {
  const distance = getUnitLatDistance();
  const searchPoint = {
    latitude: 51.92893,
    longitude: -6.043701
  };
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


test('searchDinstanceWithRangeBruteForce simple', t => {
  const distance = getUnitLatDistance();
  const searchPoint = {
    pointLat: 59.5,
    pointLon: 60
  };
  const collection = [
    {
      pointLat: 60,
      pointLon: 60,
      id: 5
    },
    {
      pointLat: 59,
      pointLon: 60,
      id: 6
    }
  ]

  const founded = searchDinstanceWithRangeBruteForce(
    searchPoint, 
    distance, 
    collection,
    {
      pointLatKey: 'pointLat',
      pointLonKey: 'pointLon'
    }
  ); 
	t.deepEqual(founded[0].id, 5);
});



test('searchDinstanceWithRangeBruteForce simple 2', t => {
  const distance = getUnitLatDistance() * 4;
  const searchPoint = {
    pointLat: 58,
    pointLon: 60
  };
  const collection = [
    {
      pointLat: 60,
      pointLon: 60,
      id: 5
    },
    {
      pointLat: 59,
      pointLon: 60,
      id: 6
    }
  ]

  const founded = searchDinstanceWithRangeBruteForce(
    searchPoint, 
    distance, 
    collection,
    {
      pointLatKey: 'pointLat',
      pointLonKey: 'pointLon'
    }
  ); 
	t.deepEqual(founded[0].id, 5);
});
