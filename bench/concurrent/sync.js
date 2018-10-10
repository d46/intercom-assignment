export default (fn, iteration) => {
  for (let i = 0; i < iteration; i++) {
    fn();  
  }  
}
