import test from 'ava';
import _customers32LatIndexed from '../data-source/customersIn500kmLatIndexed';
const customers32LatIndexed = _customers32LatIndexed.default; 
import searchBinary, { binarySearch, binarySearchWithRange } from '../src/binary-search';
import { getDistanceInFly, getIsInRange } from '../src/util/distance';


test('getDistanceInFly 100km', t => {
  const bool = getDistanceInFly(100 * 1000) < 1
  t.is(bool, true);
});

test('getIsInRange', t => {
  const pointA = 52.92893;
  const pointB = 53;
  const range = 0.5;
  const inRange = getIsInRange(
    pointA, 
    pointB, 
    range
  )
  t.is(inRange, true);
});

test('getIsInRange equility', t => {
  const pointA = 52.92893;
  const pointB = 53;
  const range = 0.1;
  const inRange = getIsInRange(
    pointA, 
    pointB, 
    range
  )
  t.is(inRange, true);
});

test('binarySearch even: Array consist key', t => {
  const array = [2, 12, 35, 57, 78, 88];
  const search = binarySearch(
    array,
    35
  )
  t.is(array[search], 35);
});

test('binarySearch even: Array not consist key and stop closest left', t => {
  const array = [2, 12, 35, 57, 78, 88];
  const search = binarySearch(
    array,
    34
  )
  t.is(array[search], 12);
});

test('binarySearch odd: Array not consist key and stop closest left', t => {
  const array = [2, 12, 35, 56, 57, 78, 88];
  const search = binarySearch(
    array,
    55
  )
  t.is(array[search], 35);
});

test('binarySearchWithRange: Not exceed range', t => {
  const distance = 1000 * 1;
  const searchPoint = {
    latitude: 52.500,
    longitude: -5.27699
  }
  const index = binarySearchWithRange(
    distance,
    +searchPoint.latitude,
    customers32LatIndexed.indexes
  ); 
  
	t.deepEqual(index, [
    52
  ]);
});

test('binarySearchWithRange: Range exceed left-handed bound', t => {
  const distance = 1000 * 20;
  const searchPoint = {
    latitude: 52.02893,
    longitude: -5.27699
  };
  const index = binarySearchWithRange(
    distance,
    +searchPoint.latitude,
    customers32LatIndexed.indexes
  ); 
  
	t.deepEqual(index, [
    51,
    52
  ]);
});

test('binarySearchWithRange: Range exceed right-handed bound', t => {
  const distance = 1000 * 10;
  const searchPoint = {
    latitude: 52.97893,
    longitude: -5.27699
  }
  const index = binarySearchWithRange(
    distance,
    +searchPoint.latitude,
    customers32LatIndexed.indexes
  ); 
  
	t.deepEqual(index, [
    52,
    53
  ]);
});

test('binarySearchWithRange: Range exceed right-handed and left-handed bound', t => {
  const distance = 1000 * 111;
  const searchPoint = {
    latitude: 52.5,
    longitude: -5.27699
  };
  const index = binarySearchWithRange(
    distance,
    +searchPoint.latitude,
    customers32LatIndexed.indexes
  ); 
  
	t.deepEqual(index, [
    52,
    53
  ]);
});

// -1.50 |52.02| +1.50
// 50.52 |52.02| 53.57
// 51,52, 53
test('binarySearchWithRange: Range exceed left-handed and right-handed with 1.5 and fill 4 gap', t => {
  const distance = 1000 * 111 * 3;
  const searchPoint = {
    latitude: 52.5,
    longitude: -5.27699
  }
  const index = binarySearchWithRange(
    distance, 
    +searchPoint.latitude, 
    customers32LatIndexed.indexes
  ); 
  
	t.deepEqual(index, [
    51,
    52,
    53,
    54
  ]);
});

test('searchCustomersWithBinary', t => {
  const distance = 1000 * 111;
  const searchPoint = {
    latitude: 51.92893,
    longitude: -6.043701
  }
  const customers = searchBinary(
    searchPoint, 
    distance, 
    customers32LatIndexed
  ); 
	t.deepEqual(customers[0].user_id, 10);
});
