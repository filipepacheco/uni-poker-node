import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

import {DocumentService} from 'src/app/services/document.service';
import {GameService} from '../../services/game.service';
import {Game} from '../../models/game';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Observable<string[]>;
  currentDoc: string;
  currentGame: Game;
  private _docSub: Subscription;
  private _gameSub: Subscription;

  constructor(private documentService: DocumentService, private gameService: GameService) { }

  ngOnInit() {
    this.documents = this.documentService.documents;
    this._docSub = this.documentService.currentDocument.subscribe(doc => this.currentDoc = doc.id);
    this._gameSub = this.gameService.currentGame.subscribe(game => this.currentGame = game);
  }

  ngOnDestroy() {
    this._docSub.unsubscribe();
  }

  newPlayer() {
    this.gameService.addPlayer();
  }

  getPlayers() {
    console.log(this.gameService.currentGame);
  }

  loadDoc(id: string) {
    this.documentService.getDocument(id);
  }

  newDoc() {
    this.documentService.newDocument();
  }

}
