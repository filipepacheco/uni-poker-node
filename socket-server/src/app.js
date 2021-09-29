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
    fetchAll(socket)
  });

  socket.on('fetchPlayers', () => {
    fetchAll(socket)
  });

  socket.on('addPlayer', (name, cash = 500) => {
    game.addPlayer({name, cash})
    fetchAll(socket)
  });

  socket.on('giveOneTo', (name) => {
    game.drawOneAndGiveTo(name)
    fetchAll(socket)
  });

});

const fetchAll = (socket) => {
  socket.emit('fetchGame', game)
  socket.emit('fetchPlayers', game.getPlayers())
}
