import test from 'ava';
import gen from '../src';

test('foo', t => {
	t.is(gen.next().value, 2);
});
test('bar', async t => {
  
	const bar = Promise.resolve('bar');
  
	t.is(await bar, 'bar');
});
