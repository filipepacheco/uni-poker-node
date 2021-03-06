import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private gameService: GameService, private router: Router) {}

  count: number = 0;
  name: string = '';

  ngOnInit() {}

  initGame() {
    this.gameService.joinRoom();
    this.gameService.addPlayer(this.name);
    this.router.navigate(['/', 'game']);
  }
}
