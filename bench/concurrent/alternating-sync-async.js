export default (fn, iteration) => {
  for (let i = 0; i < iteration; i++) {
    if (i % 2) {
      new Promise(resolve => {
        fn();
        setImmediate(resolve);
      });
    } else {
      fn();
    }
  }
}
