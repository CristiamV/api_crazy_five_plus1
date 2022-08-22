const { createServer } = require('http');

const logger = require('./utils/logger');

const app = require("./app");
const httpServer = createServer(app);

httpServer.listen(9021, () => logger.info('Listening on por 9021'));