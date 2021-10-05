import { Player } from "./Player.js";
import Deck from "card-deck";
import stdDeck from "./util/standard-deck.js";

export class Game {
  board;
  deck = new Deck(stdDeck);
  shift = 0;
  round = 0;
  position = -1;
  numPlayers = 0;
  currentPlayer = {};

  constructor(board) {
    this.board = board;
  }

  getPlayers() {
    return this.board.players;
  }

  addPlayer({ id, name, cash }) {
    const existingPlayer = this.findPlayerBy("id", id);

    if (existingPlayer !== undefined) return existingPlayer;

    const newPlayer = new Player(id, name, cash);
    this.board.newPlayer(newPlayer);
    this.numPlayers++;
    console.log(newPlayer);
    return newPlayer;
  }

  drawOneFromDeck() {
    return this.deck.drawRandom();
  }

  findPlayerBy(field, value, cb = (player) => player) {
    const findPlayer = this.getPlayers().find(
      (player) => player[field] === value
    );
    const player =
      findPlayer === undefined ? console.log("Unknown Player!") : findPlayer;
    return cb(player);
  }

  drawOneAndGiveTo(playerName) {
    this.findPlayerBy("name", playerName, (player) => {
      player.deck.push(this.drawOneFromDeck());
    });
  }

  nextPlayer() {
    this.position++;
    if (this.position === this.numPlayers) {
      this.position = 0;
      this.round++;
    }
    this.shift++;
    this.currentPlayer = this.board.players[this.position];
  }

  calculatePoints(player) {}
  endGame() {}
}
