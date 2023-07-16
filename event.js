const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on('newSale', () => {
  console.log('There is a newSale');
});
myEmitter.on('newSale', () => {
  console.log('Customer name: deng');
});
myEmitter.on('newSale', (stock) => {
  console.log(`There are now ${stock} items left in stock`);
});
myEmitter.emit('newSale', 9);

//////////////////////////////////////////////////////

const server = http.createServer();

server.on('request', (req, res) => {
  console.log(req.url);
  console.log('request received');
  res.end('request received');
});
server.on('request', (req, res) => {
  console.log('another request received');
});

server.on('close', (req, res) => {
  console.log('Server closed');
});

server.listen(8000, () => {
  console.log('Server started and waiting requests');
});
