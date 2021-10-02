import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private gameService: GameService ) { }

  name: string = ''

  ngOnInit() {
  }

  initGame(){
    console.log(this.name)
    this.gameService.addPlayer(this.name);
  }

}
