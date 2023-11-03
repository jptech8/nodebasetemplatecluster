const cluster = require('cluster');
const clusterConfig = require('./config/cluster/cluster.config');
const logger = require("./utility/logger.utils")
if(clusterConfig.enabled && cluster.isMaster) {

  logger.info(`Number of CPUs is ${clusterConfig.numProcesses}`);
  logger.info(`Master ${process.pid} is running`);
  
  // Fork workers.
  for (let i = 0; i < clusterConfig.numProcesses; i++){
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    logger.info(`Process ${worker.process.pid} died`);
  });
  process.on('SIGINT', () => {
    logger.info(`Process caught SIGINT (Master)`);
  });
} else {
  logger.info(`Process ${process.pid} starting`);
  require('./server');
}
