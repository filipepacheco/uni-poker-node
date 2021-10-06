import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { GameService } from '../../services/game.service';
import { ACTIONS, Game, Player } from '../../models/game';

@Component({
  selector: 'app-game-commands-list',
  templateUrl: './game-commands.component.html',
  styleUrls: ['./game-commands.component.css'],
})
export class GameCommandsComponent implements OnInit, OnDestroy {
  currentGame: Game;
  currentPlayers: Player[];
  currentPlayer: Player;
  players: Observable<Player[]>;
  chosenAction: ACTIONS;
  playerBetting: number = 100;
  actionsNames: string[] = ['NOTHING', 'GIVE_UP', 'PAY', 'RISE'];
  private _gameSub: Subscription;
  private _playersSub: Subscription;
  private _playerSub: Subscription;
  playerName: Player['name'];

  constructor(private gameService: GameService) {}

  imagePath = '/assets/table.png';

  ngOnInit() {
    this.gameService.fetchGame();
    this.players = this.gameService.players;
    this._gameSub = this.gameService
      .onFetchGame()
      .subscribe((data: any) => (this.currentGame = data));
    this._playersSub = this.gameService
      .onFetchPlayers()
      .subscribe((data: any) => (this.currentPlayers = data));
    this._playerSub = this.gameService
      .onFetchPlayer()
      .subscribe((data: any) => (this.currentPlayer = data));
  }

  getGame() {
    console.log(this.currentGame);
  }

  getPlayers() {
    console.log(this.currentPlayers);
  }

  playerReady() {
    this.gameService.playerReady();
  }

  chooseAction() {
    this.gameService.doAction(this.chosenAction, this.playerBetting);
  }

  addPlayer() {
    this.gameService.addPlayer(this.playerName);
  }

  joinRoom() {
    this.gameService.joinRoom();
  }

  giveOneTo(name) {
    this.gameService.giveOneTo(name);
  }

  nextPlayer() {
    this.gameService.nextPlayer();
  }

  ngOnDestroy() {
    this._gameSub.unsubscribe();
    this._playersSub.unsubscribe();
  }
}
