import {Player} from "./Player.js";

export class Game {
  board;

  constructor(board) {
    this.board = board
  }

  getPlayers(){
    return this.board.players;
  }

  addPlayer(name){
    this.board.newPlayer(new Player(name, 200));
  }

  calculatePoints(player) {}
  endGame() {}
}
