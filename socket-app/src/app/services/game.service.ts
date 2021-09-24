import {Injectable} from '@angular/core';

import {Socket} from 'ngx-socket-io';

import {Game} from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private socket: Socket) { }
  currentGame = this.socket.fromEvent<Game>('game');
  players = this.socket.fromEvent<string[]>('players');

  addPlayer() {
    this.socket.emit('addPlayer', { name: 'teste', cash: 400 });
  }

}
