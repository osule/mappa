const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const configureRoutes = require('./routes');
const db = require('./models');
const SocketServer = require('ws').Server;

const app = express();
const sub = redis.createClient(), pub = redis.createClient();
const wss = new SocketServer({ server: app });


app.use(bodyParser.json());

configureRoutes(app, db, {pub}); // publish to Redis.

// subscribe to Redis channel updates and broadcast to websockets.

app.listen(5000, () => console.log('Example app listening on port 5000!'));