import Deck from 'card-deck';
import stdDeck from './util/standard-deck.js'

export class Board {
  players = [];
  deck = new Deck(stdDeck);

  newPlayer(player) {
    this.players.push(player)
  }

  drawOneFromDeck(){
    return this.deck.drawRandom()
  }

  giveCardTo(card, playerName){
    const player = this.players.find(player => player.name === playerName );
    if(player === undefined)
      console.log('deu pau')
    else player.deck.push(card)
  }

}

const byName = (player, name) => player.name === name
