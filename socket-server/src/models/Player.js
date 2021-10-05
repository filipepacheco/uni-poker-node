import { ACTIONS } from "./util/actions.enum.js";

export class Player {
  id;
  name;
  deck = [];
  cash;
  action = ACTIONS.NOTHING;
  betting;

  constructor(id, name, cash) {
    this.id = id;
    this.cash = cash;
    this.name = name;
  }

  idle() {
    return this.action === ACTIONS.NOTHING || this.action === "";
  }

  doAction(action, betting) {
    this.action = ACTIONS[action];
    if (betting) this.betting = betting;
  }

  check() {
    this.action = ACTIONS.CHECK;
  }

  bet() {
    this.action = ACTIONS.BET;
  }

  giveUp() {
    this.action = ACTIONS.GIVE_UP;
  }

  pay() {
    this.action = ACTIONS.PAY;
  }

  rise() {
    this.action = ACTIONS.RISE;
  }
}
