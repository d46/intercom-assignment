export default (fn, iteration) => {
  for (let i = 0; i < iteration; i++) {
    new Promise(resolve => {
      fn();
      setImmediate(resolve);
    });
  }  
}
