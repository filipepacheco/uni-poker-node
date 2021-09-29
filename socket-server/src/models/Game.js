import {Player} from "./Player.js";

export class Game {
  board;

  constructor(board) {
    this.board = board
  }

  getPlayers(){
    return this.board.players;
  }

  addPlayer({id, name, cash}){
    const a = new Player(id, name, cash);
    this.board.newPlayer(a);
  }

  drawOneAndGiveTo(playerName) {
    const card = this.board.drawOneFromDeck();
    this.board.giveCardTo(card, playerName)
  }

  calculatePoints(player) {}
  endGame() {}
}
