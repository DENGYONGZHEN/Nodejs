const fs = require('fs');

// //同步读取文件，指定编码         blocking  synchronous
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

// console.log(textIn);

// //同步写入文件
// const textOut = fs.writeFileSync(
//   './txt/output.txt',
//   `this is what we know : ${textIn} \ncreate on ${Date.now()} by deng`
// );

//异步读取 nonblocking   asynchronous way
//const fs = require('fs');

// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) return console.log('something wrong 💥');
//   console.log(data1);
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       console.log(data3);
//       fs.writeFile(
//         './txt/final.txt',
//         `${data2} \n ${data3} by deng`,
//         'utf-8',
//         (err) => {
//           console.log('something wrong');
//         }
//       );
//     });
//   });
// });

fs.readFile('./txt/start.txt', 'utf-8')
  .then((err, data) => {
    console.log(data);
    return fs.readFile(`./txt/${data}.txt`, 'utf-8');
  })
  .then((err, data) => {
    console.log(data);
    return fs.readFile('./txt/append.txt', 'utf-8');
  })
  .then((err, data) => {
    console.log(data);
    fs.writeFile('./txt/final.txt', `${data}`, 'utf-8');
  });
