console.log("Hello world");
async function qwe() {
  await 3;
}

function* qwe() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = qwe();
console.log(gen.next().value)

export default gen;
