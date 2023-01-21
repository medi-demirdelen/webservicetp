const express = require('express'); 
const helmet = require('helmet'); 
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose'); 
const compression = require('compression');
const winston = require('winston');

const app = express();
app.use(helmet());
app.use(compression());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, UserID, Email'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

const dbID = process.env.DB_ID;
const dbPW = process.env.DB_PW; 
const DB = 'mongodb+srv://'+dbID+':'+dbPW+'@cluster0.h8ynmhb.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.log('MongoDB ERROR CONNECT', err)
    });

app.use(bodyParser.json());

const logger = winston.createLogger({
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'warn.log', level: 'warn'}),
    ],
});
logger.add(new winston.transports.Console({
    format: winston.format.simple(),
}));

const heroRoute = require('./routes/heroRoute');
const enemyRoute = require('./routes/enemyRoute');
const itemRoute = require('./routes/itemRoute');

app.use('/api/hero', heroRoute);
app.use('/api/enemy', enemyRoute);
app.use('/api/item', itemRoute);

module.exports = app;