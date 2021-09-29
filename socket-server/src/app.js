import express from "express";
import {createServer} from "http";
import {Server} from "socket.io";
import {Board} from "./models/Board.js";
import {Game} from "./models/Game.js";

const app = express();
const httpServer = createServer(app);
httpServer.listen(4444);
const io = new Server(httpServer, { cors: { origin: '*' } });

const board = new Board();
const game = new Game(board);

io.on("connection", (socket) => {
  console.log('connected')

  socket.on('fetchGame', () => {
    console.log('fetchGame')

    fetchAll(socket)
  });

  socket.on('fetchPlayers', () => {
    console.log('fetchPlayers')
    fetchAll(socket)
  });

  socket.on('addPlayer', (name, cash = 500) => {
    console.log('addPlayer')
    const {id} = socket
    game.addPlayer({id, name, cash})
    fetchAll(socket)
  });

  socket.on('giveOneTo', (name) => {
    console.log('giveOneTo')
    game.drawOneAndGiveTo(name)
    fetchAll(socket)
  });

});

const fetchAll = (socket) => {
  socket.emit('fetchGame', game)
  socket.emit('fetchPlayers', game.getPlayers())
}
