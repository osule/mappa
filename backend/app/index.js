const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const http_ = require('http');

const socketIO = require('socket.io');
const configureRoutes = require('./routes');
const db = require('./models');

const app = express();
const server = http_.createServer(app);
const { REDIS_HOST } = process.env;
const sub = redis.createClient(6379, REDIS_HOST), pub = redis.createClient(6379, REDIS_HOST);
const io = socketIO(server);


app.use(bodyParser.json());

io.on('connection', function (socket) { 
    console.log('WebSocket connection established');
});


const promisifyConnection = (conn, connectionAlias) => {
    return new Promise((resolve, reject) => {
        conn.on('ready', function() {
            console.log(`${connectionAlias} connection ready`);
            resolve(true);
        });
        conn.on('error', function(err) {
            console.log(`${connectionAlias} connection error`);
            reject(err);
        });
    })
};

promisifyConnection(pub, 'Redis publisher')
.then(promisifyConnection(sub, 'Redis subscriber'))
.then(() => {
    sub.subscribe('vehicles/deregister', 'vehicles/update_location');
    sub.on('message', function(channel, message) {
        console.log('here', channel, message);
        io.emit(JSON.parse(message));
    });
})
.then(() => {
    configureRoutes(app, db, { pub }) 
    server.listen(5000, () => console.log('Mappa server listening on port 5000!'));
});
