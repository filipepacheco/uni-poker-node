export class Board {
  players = [];
  deck;

  newPlayer(player) {
    this.players.push(player)
  }
}
