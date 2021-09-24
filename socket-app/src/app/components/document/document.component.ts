import {Component, OnDestroy, OnInit} from '@angular/core';
import {DocumentService} from 'src/app/services/document.service';
import {Subscription} from 'rxjs';
import {Document} from 'src/app/models/document';
import {startWith} from 'rxjs/operators';
import {GameService} from '../../services/game.service';
import {Game} from '../../models/game';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit, OnDestroy {
  document: Document;
  game: Game | {};
  private _docSub: Subscription;
  private _playerSub: Subscription;
  constructor(private documentService: DocumentService, private gameService: GameService) { }

  ngOnInit() {
    this._playerSub = this.gameService.currentGame.pipe(
      startWith({})
    ).subscribe(game => this.game = game);

    this._docSub = this.documentService.currentDocument.pipe(
      startWith({ id: '', doc: 'Select an existing document or create models new one to get started'})
    ).subscribe(document => this.document = document);
  }

  ngOnDestroy() {
    this._docSub.unsubscribe();
  }

  editDoc() {
    this.documentService.editDocument(this.document);
  }
}
