const fs = require('fs');
const crypto = require('crypto');

/**
 *  单线程执行顺序
 *    1.top-level  code
 *    2.require modules
 *    3.register event loops
 *    4. start event loop
 *         1.当callback 队列中没有callback，event loop wait
 *         2.首先执行 setImmediate 的callback函数
 *         3.执行过期时间的 setTimeout 函数
 *         4.执行 I/O polling and callbcak
 *
 *
 *  优先级
 *     process.nextTick(
 *     queueMicrotask(
 *     setImmediate(
 *     setTimeout(
 */

const startTime = Date.now();
process.env.UV_THREADPOOL_SIZE = '1';

setTimeout(() => {
  console.log('Time-out 1 has finished');
}, 0);
setImmediate(() => {
  console.log('immediate 1 has finished');
});

fs.readFile('./test-file.txt', () => {
  console.log('I/O has finished');
  console.log('----------------------------------');
  setTimeout(() => {
    console.log('Time-out 2 has finished');
  }, 0);
  setTimeout(() => {
    console.log('Time-out 3 has finished');
  }, 3000);
  setImmediate(() => {
    console.log('immediate 2 has finished');
  });
  process.nextTick(() => {
    console.log('next-tick has finished');
  });
  // queueMicrotask(() => {
  //   console.log('queueMicrotask has finished');
  // });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - startTime, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - startTime, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - startTime, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - startTime, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - startTime, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - startTime, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - startTime, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - startTime, 'Password encrypted');
  });
});

console.log('hello from the top-level code');
