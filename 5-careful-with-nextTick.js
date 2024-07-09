// const nt_recursive = () => process.nextTick(nt_recursive);
// nt_recursive(); //下面的setInterval将永远也不会执行

const si_recursive = () => setImmediate(si_recursive);
si_recursive();

setInterval(() => console.log("hi", 10));
