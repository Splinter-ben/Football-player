import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { DataState, StateStatus } from '../../../state/playersate';
import { IPlayer } from '../../../model/players';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  faPencil,
  faTrash,
  faUserCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActionPlayer, ActionPlayerType } from '../../../actions/action-player';

@Component({
  selector: 'app-list-player',
  imports: [AsyncPipe, FontAwesomeModule, CommonModule],
  templateUrl: './list-player.html',
  styleUrl: './list-player.css',
})
export class ListPlayer {
  protected readonly faPencil = faPencil;
  protected readonly faTrash = faTrash;
  protected readonly faUserCheck = faUserCheck;
  protected readonly StateStatus = StateStatus;
  @Input() observablePlayer$ = new Observable<DataState<IPlayer[]>>();
  @Output() playerEventEmitter = new EventEmitter<ActionPlayer<IPlayer>>();

  onChangeStatus(p: IPlayer) {
    this.playerEventEmitter.emit({
      type: ActionPlayerType.ON_CHANGE_STATUS_PLAYER,
      payload: p,
    });
  }

  onEditPlayer(p: IPlayer) {
    this.playerEventEmitter.emit({
      type: ActionPlayerType.ON_EDIT_PLAYER,
      payload: p,
    });
  }
  onDeletePlayers(p: IPlayer) {
        this.playerEventEmitter.emit({
      type: ActionPlayerType.ON_DELETE_PLAYER,
      payload: p,
    });
  }
}
