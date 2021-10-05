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
  readyCount = 0;
  currentPlayer = {};
  logs = ["", "", "", "", "", ""];

  log(msg) {
    console.log(msg);
    this.logs.unshift(msg);
    this.logs.pop();
  }

  constructor(board) {
    this.board = board;
  }

  getPlayers() {
    return this.board.players;
  }

  findPlayerBy(field, value, cb = (player) => player) {
    const findPlayer = this.getPlayers().find(
      (player) => player[field] === value
    );
    const player =
      findPlayer === undefined
        ? this.log("Unknown Player! " + field + value)
        : findPlayer;
    return cb(player);
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

  drawOneAndGiveTo(playerId) {
    this.findPlayerBy("id", playerId, (p) => {
      const card = this.drawOneFromDeck();
      this.log("gave " + card.value + card.suit + " to player " + p.id);
      p.deck.push(card);
    });
  }

  nextPlayer() {
    this.position++;
    if (this.position === this.numPlayers) {
      this.position = 0;
    }
    this.currentPlayer = this.board.players[this.position];

    this.shift++;
    this.log("idle " + this.currentPlayer.idle());
    if (!this.currentPlayer.idle()) {
      this.round++;
      this.clearActions();
      this.distributeCardsToBoard();
    }
  }

  distributeCardsToBoard() {
    if (this.round === 1) {
      this.log("foi");
      this.board.deck.push(this.drawOneFromDeck());
      this.board.deck.push(this.drawOneFromDeck());
      this.board.deck.push(this.drawOneFromDeck());
    }
  }

  playerReady(playerId) {
    this.findPlayerBy("id", playerId, (player) => {
      player.ready = true;
      this.readyCount++;

      this.startGame();
    });
  }

  startGame() {
    if (this.readyCount === this.numPlayers) {
      this.getPlayers().forEach((p) => {
        this.drawOneAndGiveTo(p.id);
        this.drawOneAndGiveTo(p.id);
      });

      this.nextPlayer();
      this.log("GAME STARTED!");
    }
  }

  doAction(playerId, action) {
    this.log(playerId);
    this.findPlayerBy("id", playerId, (player) => {
      if (player !== this.currentPlayer) {
        this.log("not your turn!");
        return;
      }

      player.doAction(action);
      this.log("player do action " + action);

      if (action === "RISE") {
        this.log(action);
        this.clearActionsExcept(playerId);
      }
      this.nextPlayer();
    });
  }

  clearActionsExcept(playerId) {
    const players = this.getPlayers().filter(
      (p) => p.id !== playerId && p.action !== "GIVE_UP"
    );
    players.forEach((p) => p.doAction("NOTHING"));
  }

  clearActions() {
    this.getPlayers().forEach((p) => p.doAction("NOTHING"));
  }

  calculatePoints(player) {}

  endGame() {}
}
