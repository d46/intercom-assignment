import test from 'ava';
import customers32LatIndexed from '../../data-source/lat-indexed/customersIn500kmLatIndexed';
import searchDinstanceWithRangeBinary from '../../src/search/distance/range/binary';
import { getUnitLatDistance } from '../../src/util/distance';

test('searchDinstanceWithRangeBinary', t => {
  const distance = getUnitLatDistance();
  const searchPoint = {
    latitude: 51.92893,
    longitude: -6.043701
  };
  const customers = searchDinstanceWithRangeBinary(
    searchPoint, 
    distance, 
    customers32LatIndexed,
    {
      indexKey: 'indexes',
      collectionKey: 'customers',
      pointLatKey: 'latitude',
      pointLonKey: 'longitude'
    }
  ); 
	t.deepEqual(customers[0].user_id, 10);
});


test('searchDinstanceWithRangeBinary simple', t => {
  const distance = getUnitLatDistance();
  const searchPoint = {
    pointLat: 59.5,
    pointLon: 60
  };
  const latIndexed = {
    indexes: [ 58, 59, 60, 61 ],
    collection: {
      58: [],
      59: [],
      60 : [
        {
          pointLat: 60,
          pointLon: 60,
          id: 5
        }
      ],
      61: []
    }
  };

  const founded = searchDinstanceWithRangeBinary(
    searchPoint, 
    distance, 
    latIndexed,
    {
      indexKey: 'indexes',
      collectionKey: 'collection',
      pointLatKey: 'pointLat',
      pointLonKey: 'pointLon'
    }
  ); 
	t.deepEqual(founded[0].id, 5);
});


test('searchDinstanceWithRangeBinary simple negative', t => {
  const distance = getUnitLatDistance();
  const searchPoint = {
    pointLat: -59.5,
    pointLon: -60
  };
  const latIndexed = {
    indexes: [ -61, -60, -59, -58 ],
    collection: {
      "-58": [],
      "-59": [],
      "-60" : [
        {
          pointLat: -60,
          pointLon: -60,
          id: 5
        }
      ],
      "-61": []
    }
  };

  const founded = searchDinstanceWithRangeBinary(
    searchPoint, 
    distance, 
    latIndexed,
    {
      indexKey: 'indexes',
      collectionKey: 'collection',
      pointLatKey: 'pointLat',
      pointLonKey: 'pointLon'
    }
  ); 
	t.deepEqual(founded[0].id, 5);
});

test('searchDinstanceWithRangeBinary simple 2', t => {
  const distance = getUnitLatDistance() * 4;
  const searchPoint = {
    pointLat: 58,
    pointLon: 60
  };
  const latIndexed = {
    indexes: [ 58, 59, 60, 61 ],
    collection: {
      55: [],
      56: [],
      57: [],
      58: [],
      59: [],
      60 : [
        {
          pointLat: 60,
          pointLon: 60,
          id: 5
        }
      ],
      61: []
    }
  };

  const founded = searchDinstanceWithRangeBinary(
    searchPoint, 
    distance, 
    latIndexed,
    {
      indexKey: 'indexes',
      collectionKey: 'collection',
      pointLatKey: 'pointLat',
      pointLonKey: 'pointLon'
    }
  ); 
	t.deepEqual(founded[0].id, 5);
});


test('searchDinstanceWithRangeBinary simple 2 negative', t => {
  const distance = getUnitLatDistance() * 4;
  const searchPoint = {
    pointLat: -58,
    pointLon: -60
  };
  const latIndexed = {
    indexes: [ -61, -60, -59, -58 ],
    collection: {
      "-55": [],
      "-56": [],
      "-57": [],
      "-58": [],
      "-59": [],
      "-60" : [
        {
          pointLat: -60,
          pointLon: -60,
          id: 5
        }
      ],
      "-61": []
    }
  };

  const founded = searchDinstanceWithRangeBinary(
    searchPoint, 
    distance, 
    latIndexed,
    {
      indexKey: 'indexes',
      collectionKey: 'collection',
      pointLatKey: 'pointLat',
      pointLonKey: 'pointLon'
    }
  ); 
	t.deepEqual(founded[0].id, 5);
});
