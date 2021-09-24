export class Game {
  board: Board;
}

class Board {
  players: Player[];
  deck: Card[];
}

class Player {
  name: string;
  deck: Card[];
  cash: number;
}

class Card {
  number: number;
  suit: string;
}
