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

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', '/src/index.html'));
});

const port = process.env.PORT || 8080; // this can be very useful if you deploy to Heroku!
server.listen(port, function () {
  console.log('Knock, knock');
  console.log("Who's there?");
  console.log(`Your server, listening on port ${port}`);
});

io.on('connection', (socket) => {
  console.log(`Connected to the ${socket.id}`);
  socket.emit('roll', 'someone has rolled');
});

// socket.on('connect', () => {
//   console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
// });
