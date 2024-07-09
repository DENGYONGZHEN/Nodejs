const fs = require("fs");
fs.readFile("./time-question.js", (err, data) => {
  if (err) throw err;
  console.log(data);
});
setImmediate(() => {
  console.log("This runs while file is being read");
});
