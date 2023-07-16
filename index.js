const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

///////////////////////////////////////////////////////////////fs
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
///////////////////////////////////////////////////////////////fs

//////////////////////////////////////////////////////////server

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataobj = JSON.parse(data);

const slugs = dataobj.map((el) => slugify(el.productName, { lower: true }));

const server = http.createServer((request, response) => {
  const { pathname, query } = url.parse(request.url, true);

  //overview age
  if (pathname === '/' || pathname === '/overview') {
    response.writeHead(200, {
      'Content-type': 'text/html',
    });

    const cardHtml = dataobj
      .map((el) => replaceTemplate(templateCard, el))
      .join('');
    const output = templateOverview.replace('{%PRODUCT_CARD%}', cardHtml);
    response.end(output);

    //product page
  } else if (pathname === '/product') {
    response.writeHead(200, {
      'Content-type': 'text/html',
    });
    const product = dataobj[query.id];
    const productOutput = replaceTemplate(templateProduct, product);
    response.end(productOutput);

    //api
  } else if (pathname === '/api') {
    response.writeHead(200, {
      'Content-type': 'application/json',
    });
    response.end(data);

    //not found page
  } else {
    response.writeHead(404, {
      'Content-type': 'text/html',
    });
    response.end('<h1>Page not found</h1>');
  }
});

server.listen(3000, () => {
  console.log('server is running');
});

//////////////////////////////////////////////////////////server
