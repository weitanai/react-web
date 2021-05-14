/* eslint-disable  */
const cluster = require('cluster');
const os = require('os');

let cpuCount = os.cpus().length;
let i;
cpuCount = cpuCount > 7 ? 7 : cpuCount;

process.env.NODE_ENV = 'local';

switch (process.env.UAE_MODE) {
  case 'DEV':
    cpuCount = 2;
    break;
  case 'TEST':
    cpuCount = 2;
    break;
  case 'PROD':
  default:
}

console.log(`当前开启进程数：${cpuCount}`);

// 非本地环境才需要多进程
if (process.env.UAE_MODE && cluster.isMaster) {
  for (i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    console.log(`> Worker ${worker.id} died :(`);
    cluster.fork();
  });
} else if (require.main === module) {
  require('./app');
}
