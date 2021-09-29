export class Player {
  id;
  name;
  deck = [];
  cash;

  constructor(id, name, cash) {
    this.id = id
    this.cash = cash
    this.name = name
  }
}
