const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down....');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

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
const server = app.listen(port, () => {
  console.log(`server is listening on port: ${port} `);
});

//处理全局的unhandledRejection 是mongodb 和express之外的异常
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down....');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
