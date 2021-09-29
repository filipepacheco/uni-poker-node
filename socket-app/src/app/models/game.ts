export class Game {
  board: Board;
  deck: Deck;
  round: number;
  shift: number;
  position: number;
  numPlayers: number;
  currentPlayer = Player;
}

class Board {
  players: Player[];
  deck: Deck;
}

export class Player {
  id: string;
  name: string;
  deck: Card[];
  cash: number;
}

class Deck {
  _stack: Card[];
}

class Card {
  value: number;
  suit: string;
}
