export class Board {
  players = [];
  deck = [];

  newPlayer(player) {
    this.players.push(player)
  }

  drawOneFromDeck(){
    return this.deck.drawRandom()
  }


}

const byName = (player, name) => player.name === name
