import app from "express";
import {Server} from 'http';
import SocketIO from 'socket.io';
import {Game} from "./models/Game.js";
import {Board} from "./models/Board.js";

const httpServer = Server(app);
const io = SocketIO(httpServer);


io.on('connection', socket => {
  const documents = {};
  let previousId;

  const board = new Board();
  const game = new Game(board);

  const safeJoin = (currentId, socket) => {
    socket.leave(previousId);
    console.log(currentId)
    socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
    previousId = currentId;
  }

  io.emit('documents', Object.keys(documents));
  console.log(`Socket ${socket.id} has connected`);

  socket.on('game', docId => {
    socket.emit('game', game);
    console.log('game', game)
  });

  socket.on('players', docId => {
    const a = game.getPlayers()
    socket.emit('game', a);
    console.log('get players', a)
  });

  socket.on('addPlayer', name => {
    game.addPlayer(name)
    socket.emit('game', 'success');
    console.log('add player', game.getPlayers())
  });





  socket.on('getDoc', docId => {
    safeJoin(docId, socket);
    socket.emit('document', documents[docId]);
  });

  socket.on('addDoc', doc => {
    console.log(game)
    documents[doc.id] = doc;
    safeJoin(doc.id, socket);
    io.emit('documents', Object.keys(documents));
    socket.emit('document', doc);
  });

  socket.on('editDoc', doc => {
    documents[doc.id] = doc;
    socket.to(doc.id).emit('document', doc);
  });
})

httpServer.listen(4444, () => {
  console.log('Listening on port 4444');
});
