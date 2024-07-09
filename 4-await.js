const sleep_st = (t) => new Promise((r) => setTimeout(r, t));
const sleep_im = () => new Promise((r) => setImmediate(r));

// (async () => {
//   setImmediate(() => console.log(1));
//   console.log(2);
//   await sleep_st(0); //调用sleep_st(0)会返回一个pending状态的Promise，await 就相当于调用then方法
//   //调用setTimeout(r, t)，之后的所有的代码都包含在r这个回调函数中
//   setImmediate(() => console.log(3));
//   console.log(4);
//   await sleep_im();
//   setImmediate(() => {
//     console.log(5);
//   });
//   console.log(6);
//   await 1;
//   // 单纯的生成一个Promise, 会把下面的代码包含在promise的resolve的回调函数中;
//   setImmediate(() => console.log(7));
//   console.log(8);
// })();

(async () => {
  setImmediate(() => console.log(1));
  console.log(2);
  setTimeout(() => {
    setImmediate(() => console.log(3));
    console.log(4);
  }, 0);
  //   Promise.resolve().then(() =>
  //     setTimeout(() => {
  //       setImmediate(() => console.log(3));
  //       console.log(4);
  //       Promise.resolve().then(() =>
  //         setImmediate(() => {
  //           setImmediate(() => console.log(5));
  //           console.log(6);
  //           Promise.resolve().then(() => {
  //             setImmediate(() => console.log(7));
  //             console.log(8);
  //           });
  //         })
  //       );
  //     }, 0)
  //   );
})();
