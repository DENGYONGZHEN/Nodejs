const date = Date.now();

setTimeout(() => console.log("A", Date.now() - date), 0);
console.log("B", Date.now() - date);
setTimeout(() => console.log("C", Date.now() - date), 100);
setTimeout(() => console.log("D", Date.now() - date), 0);

let i = 0;
while (i < 1_000_000_000) {
  let ignore = Math.sqrt(i);
  i++;
}
console.log("E", Date.now() - date);
