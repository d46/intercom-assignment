import alternatingSyncAsync from './concurrent/alternating-sync-async';
import asyncImmediate from './concurrent/async-immediate';
import asyncTimeout from './concurrent/async-timeout';
import sync from './concurrent/sync';
import App from '../src';

// Bind parameters to the various loop functions
// to shake the event-loop
const getTasks = function* (fn, iteration) {
  yield {
    name: `${fn.name}: Sync iteration x${iteration}`,
    task: sync.bind(null, fn, iteration)
  };
  yield {
    name: `${fn.name}: asyncTimeout iteration x${iteration}`,
    task: asyncTimeout.bind(null, fn, iteration)
  };
  yield {
    name: `${fn.name}: alternatingSyncAsync iteration x${iteration}`,
    task: alternatingSyncAsync.bind(null, fn, iteration)
  };
  yield {
    name: `${fn.name}: asyncImmediate iteration x${iteration}`,
    task: asyncImmediate.bind(null, fn, iteration)
  };
  yield {
    name: `${fn.name}: asyncTimeout iteration x${iteration}`,
    task: asyncTimeout.bind(null, fn, iteration)
  };
}

// Run tasks in order
const runTasks = (_taskIterator) => {
  const { 
    value,
    done 
  } = _taskIterator.next();
  if ( done ) return false;

  const {
    name,
    task
  } = value;
  // Execute task and clock time
  let start = Date.now();
  task();
  let end = Date.now();
  
  console.log(name)
  console.log(end - start);
  if (!done) runTasks();
}

runTasks(
  getTasks(
    App.bruteForce, // Executed function for testing
    100000 // Iteration count
  )
);
