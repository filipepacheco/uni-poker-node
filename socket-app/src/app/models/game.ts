export class Game {
  board: Board;
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
