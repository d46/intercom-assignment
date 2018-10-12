import test from 'ava';
import _customers32LatIndexed from '../data-source/customersIn500kmLatIndexed';
const customers32LatIndexed = _customers32LatIndexed.default; 
import searchBinary, { binarySearch, binarySearchWithRange } from '../src/binary-search';
import { getUnitLatDistance } from '../src/util/distance';

test('binarySearch odd: Array consist key', t => {
  const array = [2, 12, 35, 57, 78, 88, 99];
  const search = binarySearch(
    array,
    35
  )
  t.is(array[search], 35);
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
  const distance = getUnitLatDistance() / 10;
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
  const distance = getUnitLatDistance() / 3; // ~0.33
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
  const distance = getUnitLatDistance() / 5; // ~0.2
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
  const distance = getUnitLatDistance(); // ~1
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
  const distance = getUnitLatDistance() * 3; // ~333km
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
  const distance = getUnitLatDistance();
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
