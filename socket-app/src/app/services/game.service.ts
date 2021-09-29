import {Injectable} from '@angular/core';

import {Socket} from 'ngx-socket-io';

import {Game} from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private socket: Socket) { }
  currentGame = this.socket.fromEvent<Game>('game');
  players = this.socket.fromEvent('getPlayers');

  // emit event
  fetchGame() {
    this.socket.emit('fetchGame');
  }

  // listen event
  onFetchGame() {
    return this.socket.fromEvent('fetchGame');
  }

  addPlayer(name) {
    this.socket.emit('addPlayer', name);
  }

  giveOneTo(name) {
    this.socket.emit('giveOneTo', name);
  }

  onFetchPlayers() {
    return this.socket.fromEvent('fetchPlayers');
  }

}
