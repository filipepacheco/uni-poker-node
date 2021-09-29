import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GameService} from '../../services/game.service';
import {Game, Player} from '../../models/game';

@Component({
  selector: 'app-game-commands-list',
  templateUrl: './game-commands.component.html',
  styleUrls: ['./game-commands.component.css']
})
export class GameCommandsComponent implements OnInit, OnDestroy {
  currentGame: Game;
  currentPlayers: Player[];
  private _gameSub: Subscription;
  private _playersSub: Subscription;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.fetchGame();
    this._gameSub = this.gameService.onFetchGame().subscribe((data: any) => this.currentGame = data);
    this._playersSub = this.gameService.onFetchPlayers().subscribe((data: any) => this.currentPlayers = data);
  }

  getGame() {
    console.log(this.currentGame);
  }

  getPlayers() {
    console.log(this.currentPlayers);
  }

  addPlayer(name) {
    this.gameService.addPlayer(name);
  }

  giveOneTo(name) {
    this.gameService.giveOneTo(name);
  }

  ngOnDestroy() {
    this._gameSub.unsubscribe();
    this._playersSub.unsubscribe();
  }

}
