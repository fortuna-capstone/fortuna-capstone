const { SSL_OP_NO_TICKET } = require('constants');
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, '..', '/')));

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', '/src/index.html'));
});

const port = process.env.PORT || 8080; // this can be very useful if you deploy to Heroku!
server.listen(process.env.PORT || 8080, function () {
  console.log('Knock, knock');
  console.log("Who's there?");
  console.log(`Your server, listening on port ${port}`);
});

let players = {};

io.on('connection', (socket) => {
  players[socket.id] = {
    playerId: socket.id,
    career: [],
    bankAccount: 0,
    lifeTiles: [],
    salary: {},
    deskItems: [],
    house: [],
    gamePiece: {},
    x: 130,
    y: 270,
    isTurn: 0,
  };
  socket.on('disconnect', function () {
    console.log('user disconnected');
    delete players[socket.id];
  });

  socket.on('playerMovement', function (movementData) {
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;
    socket.broadcast.emit('playerMoved', players[socket.id]);
  });
  socket.on('payday', function (payData) {
    players[socket.id].bankAccount = payData.bankAccount;
    socket.broadcast.emit('gotPaid', players[socket.id]);
  });
  socket.on('career', function (careerData) {
    players[socket.id].career = careerData.career;
    socket.broadcast.emit('gotCareer', players[socket.id]);
  });
  socket.on('house', function (houseData) {
    players[socket.id].house = houseData.house;
    socket.broadcast.emit('gotHouse', players[socket.id]);
  });
  socket.on('lifeTiles', function (lifeTilesData) {
    players[socket.id].lifeTiles = lifeTilesData.lifeTiles;
    socket.broadcast.emit('gotLifeTiles', players[socket.id]);
  });
  socket.on('salary', function (salaryData) {
    players[socket.id].salary = salaryData.salary;
    socket.broadcast.emit('gotSalary', players[socket.id]);
  });

  socket.emit('currentPlayers', players);
  socket.broadcast.emit('newPlayer', players[socket.id]);

  console.log(`Connected to the ${socket.id}`);
  socket.emit('roll', 'someone has rolled');

  socket.emit('currentPlayers', players);
  socket.broadcast.emit('playerLeft', players[socket.id]);
});
