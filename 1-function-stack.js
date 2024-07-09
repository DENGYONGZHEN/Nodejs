function a() {
  b();
  console.log("a");
}
function b() {
  c();
  console.log("b");
}
function c() {
  console.log("c");
}

function x() {
  y();
  console.log("x");
}
function y() {
  z();
  console.log("y");
}
function z() {
  console.log("z");
}

setTimeout(x, 0);
a();
