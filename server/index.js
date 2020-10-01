// libs
const express = require('express');
const compressionMiddleware = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const pino = require('pino');
const expressPino = require('express-pino-logger');
const createHttpError = require('http-errors');

// my imports
const db = require('./db');
const myErrorHandler = require('./utils/myErrorHandler');
const routes = require('./routes');

// logging setup
// levels: trace, debug, info, warn, error, fatal
const validLogLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];
let logLevel = process.env.LOG_LEVEL;
if (!validLogLevels.includes(logLevel)) logLevel = 'info';
const logger = pino({ level: logLevel });
const expressLogger = expressPino({ logger });

const apiPort = process.env.PORT || 3000;
const app = express();

app.use(expressLogger);
app.use(compressionMiddleware());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Where we connect all our routing into the app
app.use('/', routes);

// handle 404s for nonexistent routes
app.use((req, res, next) => next(createHttpError(404)));
// use custom error handler to reduce boilerplate in routing functions
app.use(myErrorHandler);

app.listen(apiPort, () => logger.info(`Server running on port ${apiPort}`));
