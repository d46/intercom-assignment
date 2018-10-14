import alternatingSyncAsync from './concurrent/alternating-sync-async';
import asyncImmediate from './concurrent/async-immediate';
import asyncTimeout from './concurrent/async-timeout';
import sync from './concurrent/sync';
import { binarySearch2d, binarySearch2d20kCustomer, binarySearch2d32Customer, binarySearch2d2kCustomer } from '../src';
import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';

// Bind parameters to the various loop functions
// for shake the event-loop
const getTasks = function* (fn, iteration) {
  yield {
    name: `${fn.name}: Sync iteration x${iteration}`,
    task: sync.bind(null, fn, iteration),
    plainName: fn.name,
    type: 'sync'
  };
  yield {
    name: `${fn.name}: asyncTimeout iteration x${iteration}`,
    task: asyncTimeout.bind(null, fn, iteration),
    plainName: fn.name,
    type: 'asyncTimeout'
  };
  yield {
    name: `${fn.name}: alternatingSyncAsync iteration x${iteration}`,
    task: alternatingSyncAsync.bind(null, fn, iteration),
    plainName: fn.name,
    type: 'alternatingSyncAsync'
  };
  yield {
    name: `${fn.name}: asyncImmediate iteration x${iteration}`,
    task: asyncImmediate.bind(null, fn, iteration),
    plainName: fn.name,
    type: 'asyncImmediate'
  };
}

// Run tasks in order
const runTasks = (_taskIterator, acc = []) => {
  const { 
    value,
    done 
  } = _taskIterator.next();
  if ( done ) return false;

  const {
    name,
    task,
    plainName,
    type
  } = value;
  // Execute task and clock time
  let start = Date.now();
  task();
  let end = Date.now();
  
  acc.push({
    plainName,
    name,
    time: end - start,
    type
  });
  if (!done) runTasks(_taskIterator, acc);
  return acc
}

const executeTasksWithFn = (fn) => {
  const plainName = fn.name;
  const result = runTasks(
    getTasks(
      fn, // Executed function for testing
      100000 // Iteration count
    )
  );
  
  console.log(`Done iteration for ${plainName}`);
  mkdirp.sync(path.join(__dirname, 'results'));
  fs.writeFileSync(
    path.join(__dirname, 'results', `${plainName}-${+new Date()}.json`),
    JSON.stringify(result, null, 4)
  )
}

console.log('Benchmark has been started.');
const timeA = Date.now();
[
  // App.bruteForce32Customer,
  // App.bruteForce32Customer,
  // App.bruteForce32Customer,
  // App.bruteForce32Customer,
  // App.bruteForce32Customer,

  // App.bruteForce2kCustomer,
  // App.bruteForce2kCustomer,
  // App.bruteForce2kCustomer,
  // App.bruteForce2kCustomer,
  // App.bruteForce2kCustomer,
  
  // App.bruteForce20kCustomer,
  // App.bruteForce20kCustomer,
  // App.bruteForce20kCustomer,
  // App.bruteForce20kCustomer,

  // App.binary32Customer,
  // App.binary32Customer,
  // App.binary32Customer,
  // App.binary32Customer,
  // App.binary32Customer,

  // App.binary2kCustomer,
  // App.binary2kCustomer,
  // App.binary2kCustomer,
  // App.binary2kCustomer,
  // App.binary2kCustomer,

  // App.binary20kCustomer,
  // App.binary20kCustomer,
  // App.binary20kCustomer,
  // App.binary20kCustomer,
  // App.binary20kCustomer
  
  binarySearch2d32Customer,
  binarySearch2d32Customer,
  binarySearch2d32Customer,
  binarySearch2d32Customer,
  binarySearch2d32Customer,

  binarySearch2d2kCustomer,
  binarySearch2d2kCustomer,
  binarySearch2d2kCustomer,
  binarySearch2d2kCustomer,
  binarySearch2d2kCustomer,

  binarySearch2d20kCustomer,
  binarySearch2d20kCustomer,
  binarySearch2d20kCustomer,
  binarySearch2d20kCustomer,
  binarySearch2d20kCustomer,
  
].forEach(executeTasksWithFn);
const timeB = Date.now();
console.log(`Completed in ${(timeB - timeA) / 1000}sec`);
