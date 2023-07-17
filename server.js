const app = require('./app');

// 4) start server

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is listening on port: ${port} `);
});
