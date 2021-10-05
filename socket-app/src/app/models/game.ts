export class Game {
  board: Board;
  deck: Deck;
  round: number;
  shift: number;
  position: number;
  numPlayers: number;
  readyCount: number;
  currentPlayer = Player;
  logs = [];
}

class Board {
  players: Player[];
  deck: Card[];
}

export class Player {
  id: string;
  name: string;
  deck: Card[];
  cash: number;
  action: ACTIONS;
  ready: boolean;
  betting: number;
}

export enum ACTIONS {
  NOTHING,
  CHECK,
  BET,
  GIVE_UP,
  PAY,
  RISE,
}

class Deck {
  _stack: Card[];
}

class Card {
  value: number;
  suit: string;
}
