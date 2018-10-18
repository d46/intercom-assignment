import test from 'ava';
import customers32LatLonIndexed from '../../data-source/lat-lon-indexed/customersIn500kmLatLonIndexed';
import searchDinstanceWithRangeBinary2d from '../../src/search/distance/range/binary2d';
import { getUnitLatDistance } from '../../src/util/distance';

test('searchDinstanceWithRangeBinary2d', t => {
  const distance = getUnitLatDistance();
  const searchPoint = {
    latitude: 51.92893,
    longitude: -6.043701
  };
  const customers = searchDinstanceWithRangeBinary2d(
    searchPoint, 
    distance, 
    customers32LatLonIndexed,
    {
      indexLatKey: 'latIndexes',
      indexLonKey: 'lonIndexes',
      collectionKey: 'customers',
      pointLatKey: 'latitude',
      pointLonKey: 'longitude'
    }
  );
	t.deepEqual(customers[0].user_id, 10);
});

test('searchDinstanceWithRangeBinary2d simple', t => {
  const distance = getUnitLatDistance();
  const searchPoint = {
    latitude: 59.5,
    longitude: 60
  };
  const latLonIndexed = {
    latIndexes: [ 58, 59, 60, 61 ],
    lonIndexes: [ 60 ],
    collection: {
      58: {},
      59: {},
      60 : {
        60: [
          {
            latitude: 60,
            longitude: 60,
            id: 5
          }
        ]
      },
      61: []
    }
  };

  const founded = searchDinstanceWithRangeBinary2d(
    searchPoint, 
    distance, 
    latLonIndexed,
    {
      indexLatKey: 'latIndexes',
      indexLonKey: 'lonIndexes', 
      collectionKey: 'collection',
      pointLatKey: 'latitude',
      pointLonKey: 'longitude'
    }
  ); 
	t.deepEqual(founded[0].id, 5);
});

test('searchDinstanceWithRangeBinary2d simple negative', t => {
  const distance = getUnitLatDistance();
  const searchPoint = {
    latitude: -59.5,
    longitude: -60
  };
  const latLonIndexed = {
    latIndexes: [ -61, -60, -59, -58 ],
    lonIndexes: [ -60 ],
    collection: {
      "-58": {},
      "-59": {},
      "-60" : {
        "-60": [
          {
            latitude: -60,
            longitude: -60,
            id: 5
          }
        ]
      },
      "-61": []
    }
  };

  const founded = searchDinstanceWithRangeBinary2d(
    searchPoint, 
    distance, 
    latLonIndexed,
    {
      indexLatKey: 'latIndexes',
      indexLonKey: 'lonIndexes', 
      collectionKey: 'collection',
      pointLatKey: 'latitude',
      pointLonKey: 'longitude'
    }
  ); 
	t.deepEqual(founded[0].id, 5);
});



test('searchDinstanceWithRangeBinary2d simple 2', t => {
  const distance = getUnitLatDistance() * 4;
  const searchPoint = {
    latitude: 58,
    longitude: 60
  };
  const latLonIndexed = {
    latIndexes: [ 58, 59, 60, 61 ],
    lonIndexes: [ 60 ],
    collection: {
      58: {},
      59: {},
      60 : {
        60: [
          {
            latitude: 60,
            longitude: 60,
            id: 5
          }
        ]
      },
      61: []
    }
  };

  const founded = searchDinstanceWithRangeBinary2d(
    searchPoint, 
    distance, 
    latLonIndexed,
    {
      indexLatKey: 'latIndexes',
      indexLonKey: 'lonIndexes', 
      collectionKey: 'collection',
      pointLatKey: 'latitude',
      pointLonKey: 'longitude'
    }
  ); 
	t.deepEqual(founded[0].id, 5);
});


test('searchDinstanceWithRangeBinary2d simple 2 negative', t => {
  const distance = getUnitLatDistance() * 4;
  const searchPoint = {
    latitude: -58,
    longitude: -60
  };
  const latLonIndexed = {
    latIndexes: [ -61, -60, -59, -58 ],
    lonIndexes: [ -60 ],
    collection: {
      "-58": {},
      "-59": {},
      "-60" : {
        "-60": [
          {
            latitude: -60,
            longitude: -60,
            id: 5
          }
        ]
      },
      "-61": []
    }
  };

  const founded = searchDinstanceWithRangeBinary2d(
    searchPoint, 
    distance, 
    latLonIndexed,
    {
      indexLatKey: 'latIndexes',
      indexLonKey: 'lonIndexes', 
      collectionKey: 'collection',
      pointLatKey: 'latitude',
      pointLonKey: 'longitude'
    }
  ); 
	t.deepEqual(founded[0].id, 5);
});
