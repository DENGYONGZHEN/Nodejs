const mongoose = require('mongoose');
const app = require('./app');

const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

//连接MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('db connection success!'));

// 4) start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is listening on port: ${port} `);
});
