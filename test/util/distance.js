import test from 'ava';
import { distanceToLatLength, isInRange, haversine, getUnitLatDistance } from '../../src/util/distance';

test('distanceToLatLength 100km', t => {
  const bool = distanceToLatLength(100 * 1000) < 1
  t.is(bool, true);
});

test('isInRange', t => {
  const pointA = 52.92893;
  const pointB = 53;
  const range = 0.5;
  const inRange = isInRange(
    pointA, 
    pointB, 
    range
  )
  t.is(inRange, true);
});

test('isInRange equility', t => {
  const pointA = 52.5;
  const pointB = 53;
  const range = 0.5;
  const inRange = isInRange(
    pointA, 
    pointB, 
    range
  )
  t.is(inRange, true);
});

test('isInRange not in range', t => {
  const pointA = 52.5;
  const pointB = 53;
  const range = 0.4;
  const inRange = isInRange(
    pointA, 
    pointB, 
    range
  )
  t.is(inRange, false);
});

test('isInRange negative', t => {
  const pointA = -52.92893;
  const pointB = -53;
  const range = 0.5;
  const inRange = isInRange(
    pointA, 
    pointB, 
    range
  )
  t.is(inRange, true);
});

test('isInRange not in range negative', t => {
  const pointA = -51.92893;
  const pointB = -53;
  const range = 0.5;
  const inRange = isInRange(
    pointA, 
    pointB, 
    range
  )
  t.is(inRange, false);
});

test('isInRange not in range negative positive', t => {
  const pointA = -51.92893;
  const pointB = 53;
  const range = 0.5;
  const inRange = isInRange(
    pointA, 
    pointB, 
    range
  )
  t.is(inRange, false);
});

test('isInRange not in range negative positive reverse', t => {
  const pointA = 51.92893;
  const pointB = -53;
  const range = 0.5;
  const inRange = isInRange(
    pointA, 
    pointB, 
    range
  )
  t.is(inRange, false);
});

test('haversine', t => {
  const pointALatLon = [0,1];
  const pointBLatLon = [1,1];
  const distance = haversine(
    pointALatLon, 
    pointBLatLon
  )
  t.is(distance < 111000, false);
});

test('getUnitDistanceLat', t => {
  const unitLatDistance = getUnitLatDistance(); // ~111177.99068882648
  const inRange = unitLatDistance < 111200 && unitLatDistance > 111111;
  t.is(inRange, true);
});
