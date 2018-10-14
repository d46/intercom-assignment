import test from 'ava';
import { absFloor } from '../../src/util/math';

test('absFloor: negative', t => {
  t.is(absFloor(-2.34), -2);
});

test('absFloor: positive', t => {
  t.is(absFloor(2.34), 2);
});

test('absFloor: zero', t => {
  t.is(absFloor(0), 0);
});
