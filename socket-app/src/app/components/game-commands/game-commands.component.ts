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
  players: Observable<Player[]>;
  chosenAction: ACTIONS;
  actionsNames: string[] = [
    'NOTHING',
    'CHECK',
    'BET',
    'GIVE_UP',
    'PAY',
    'RISE',
  ];
  private _gameSub: Subscription;
  private _playersSub: Subscription;
  playerName: Player['name'];

  constructor(private gameService: GameService) {}

  imagePath = '/assets/table.png'

  ngOnInit() {
    this.gameService.fetchGame();
    this.players = this.gameService.players;
    this._gameSub = this.gameService
      .onFetchGame()
      .subscribe((data: any) => (this.currentGame = data));
    this._playersSub = this.gameService
      .onFetchPlayers()
      .subscribe((data: any) => (this.currentPlayers = data));
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
    this.gameService.doAction(this.chosenAction);
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
