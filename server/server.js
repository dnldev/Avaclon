const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const express_log = require('debug')('express');
// const random_string = require('randomstring');

const Lobby = require('./classes/Lobby');

const port = 5000;
const lobbies = {};

server.listen(port);

app.post('/lobby', (req, res) => {
  express_log('New Lobby');

  // const id = random_string.generate(4);
  const id = 'josh';
  const new_lobby = new Lobby(id, io.of('/lobby/' + id));

  lobbies[id] = new_lobby;

  res.send(id);
});

app.get('/lobby/:id/setUp', (req, res) => {
  if (Object.keys(lobbies).indexOf(req.params.id) >= 0) {
    res.send(lobbies[req.params.id].setUp);
  } else {
    res.status(404).send('Lobby id not found');
  }
});
