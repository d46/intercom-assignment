import alternatingSyncAsync from './concurrent/alternating-sync-async';
import asyncImmediate from './concurrent/async-immediate';
import asyncTimeout from './concurrent/async-timeout';
import sync from './concurrent/sync';
import App from '../src';
import * as fs from 'fs';
import * as path from 'path';

// Bind parameters to the various loop functions
// for shake the event-loop
const getTasks = function* (fn, iteration) {
  yield {
    name: `${fn.name}: Sync iteration x${iteration}`,
    task: sync.bind(null, fn, iteration),
    plainName: fn.name
  };
  yield {
    name: `${fn.name}: asyncTimeout iteration x${iteration}`,
    task: asyncTimeout.bind(null, fn, iteration),
    plainName: fn.name
  };
  yield {
    name: `${fn.name}: alternatingSyncAsync iteration x${iteration}`,
    task: alternatingSyncAsync.bind(null, fn, iteration),
    plainName: fn.name
  };
  yield {
    name: `${fn.name}: asyncImmediate iteration x${iteration}`,
    task: asyncImmediate.bind(null, fn, iteration),
    plainName: fn.name
  };
  yield {
    name: `${fn.name}: asyncTimeout iteration x${iteration}`,
    task: asyncTimeout.bind(null, fn, iteration),
    plainName: fn.name
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
    plainName
  } = value;
  // Execute task and clock time
  let start = Date.now();
  task();
  let end = Date.now();
  
  acc.push({
    plainName,
    name,
    time: end - start,
  })
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
  
  console.log(`Done benchmark for ${plainName}`);
  fs.writeFileSync(
    path.join(__dirname, 'results', `${plainName}-${+new Date()}.json`),
    JSON.stringify(result, null, 4)
  )
}

[
  App.bruteForce32Customer,
  App.bruteForce32Customer,
  App.bruteForce32Customer,
  App.bruteForce32Customer,
  App.bruteForce32Customer,

  App.bruteForce2kCustomer,
  App.bruteForce2kCustomer,
  App.bruteForce2kCustomer,
  App.bruteForce2kCustomer,
  App.bruteForce2kCustomer,
  
  // App.bruteForce90kCustomer
].forEach(executeTasksWithFn);
