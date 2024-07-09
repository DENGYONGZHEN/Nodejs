const cluster = require("cluster");
const { sign } = require("crypto");
console.log(`master pid =${process.pid}`); // 设置子进程要执行的文件路径
cluster.setupMaster({
  exec: __dirname + "/producer-http-basic.js",
});
cluster.fork(); // 创建两个子进程
cluster.fork();

cluster //监听子进程的事件
  .on("disconnect", (worker) => {
    console.log("disconnect", worker.id);
  })
  .on("exit", (worker, code, signal) => {
    console.log("exit", worker.id, code, signal);
  })
  .on("listening", (worker, { address, port }) => {
    console.log("listening", worker.id, `${address}:${port}`);
  });
