import { Injectable } from "@angular/core";

import { Socket } from "ngx-socket-io";

import { Game, Player } from "../models/game";

@Injectable({
  providedIn: "root",
})
export class GameService {
  constructor(private socket: Socket) {}
  currentGame = this.socket.fromEvent<Game>("game");
  players = this.socket.fromEvent<Player[]>("getPlayers");

  // emit event
  fetchGame() {
    this.socket.emit("fetchGame");
  }

  // emit event
  joinRoom() {
    this.socket.emit("joinRoom");
  }

  // listen event
  onFetchGame() {
    return this.socket.fromEvent("fetchGame");
  }

  addPlayer(name) {
    this.socket.emit("addPlayer", name);
  }

  giveOneTo(name) {
    this.socket.emit("giveOneTo", name);
  }

  nextPlayer() {
    this.socket.emit("nextPlayer", name);
  }

  onFetchPlayers() {
    return this.socket.fromEvent("fetchPlayers");
  }
}
