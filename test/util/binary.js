import test from 'ava';
import { binarySearchWithRangeDouble, binarySearch } from '../../src/util/binary';

test('binarySearch odd: single', t => {
  const array = [2];
  const search = binarySearch(
    array,
    2
  )
  t.is(array[search], 2);
});

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

test('binarySearch even: Array not consist key and stop on closest left-handed', t => {
  const array = [2, 12, 35, 57, 78, 88];
  const search = binarySearch(
    array,
    34
  )
  t.is(array[search], 12);
});

test('binarySearch odd: Array not consist key and stop closest on left-handed', t => {
  const array = [2, 12, 35, 56, 57, 78, 88];
  const search = binarySearch(
    array,
    55
  )
  t.is(array[search], 35);
});

// Current index 52
// -(0.11/2) # 52.50 # +(0.11/2)
// Left bound 52.45 # 52.50 # Right bound 52.55
test('binarySearchWithRange: Range not exceed index bound', t => {
  const indexes = [51, 52, 53, 54];
  const point = 52.500;
  const range = 0.11;
  
  const founded = binarySearchWithRangeDouble(
    range,
    point,
    indexes
  ); 
  
	t.deepEqual(founded, [
    52
  ]);
});

// Current index 52
// -(0.33/2) # 52.02 # +(0.33/2)
// Left bound 51.96 # 52 # 52.08
test('binarySearchWithRange: Range exceed left-handed bound', t => {
  const indexes = [51, 52, 53, 54];
  const point = 52.02983;
  const range = 0.06;

  const founded = binarySearchWithRangeDouble(
    range,
    point,
    indexes
  ); 
  
	t.deepEqual(founded, [
    51,
    52
  ]);
});

// Current index 52
// -(0.16/2) # 52.0789 # +(0.16/2)
// Left bound 51.998 # 52.0898 # 52.1589
test('binarySearchWithRange: Range exceed right-handed bound', t => {
  const indexes = [51, 52, 53, 54];
  const point = 52.0789;
  const range = 0.16;

  const founded = binarySearchWithRangeDouble(
    range,
    point,
    indexes
  ); 
  
	t.deepEqual(founded, [
    51,
    52
  ]);
});

test('binarySearchWithRange: Range exceed right-handed and left-handed bound', t => {
  const indexes = [51, 52, 53, 54];
  const point = 52.5;
  const range = 1;

  const founded = binarySearchWithRangeDouble(
    range,
    point,
    indexes
  ); 
  
	t.deepEqual(founded, [
    52,
    53
  ]);
});

// -1.50 # 52.5 # +1.50
// 51.0 # 52.5 # 54.0
test('binarySearchWithRange: Range exceed left-handed and right-handed with 1.5 and fill 4 gap', t => {
  const indexes = [48, 49, 50, 51, 52, 53, 54, 55, 56];
  const point = 52.5;
  const range = 3;
  const founded = binarySearchWithRangeDouble(
    range, 
    point, 
    indexes
  ); 
  
	t.deepEqual(founded, [
    51,
    52,
    53,
    54
  ]);
});
