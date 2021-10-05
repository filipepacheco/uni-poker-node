import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';

import { Game, Player } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private socket: Socket) {}

  currentGame = this.socket.fromEvent<Game>('game');
  players = this.socket.fromEvent<Player[]>('getPlayers');

  doAction(action, betting) {
    this.socket.emit('doAction', action, betting);
  }

  // emit event
  fetchGame() {
    this.socket.emit('fetchGame');
  }

  // emit event
  joinRoom() {
    this.socket.emit('joinRoom');
  }

  // emit event
  playerReady() {
    this.socket.emit('playerReady');
  }

  // listen event
  onFetchGame() {
    return this.socket.fromEvent('fetchGame');
  }

  addPlayer(name: string) {
    this.socket.emit('addPlayer', name);
  }

  giveOneTo(name: string) {
    this.socket.emit('giveOneTo', name);
  }

  nextPlayer() {
    this.socket.emit('nextPlayer', name);
  }

  onFetchPlayers() {
    return this.socket.fromEvent('fetchPlayers');
  }
}
