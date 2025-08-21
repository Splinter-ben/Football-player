import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { DataState, StateStatus } from '../../../state/playersate';
import { IPlayer } from '../../../model/players';
import { AsyncPipe, CommonModule } from '@angular/common';

import { ActionPlayer, ActionPlayerType } from '../../../actions/action-player';
import { ItemPlayer } from './item-player/item-player';

@Component({
  selector: 'app-list-player',
  imports: [AsyncPipe, CommonModule, ItemPlayer],
  templateUrl: './list-player.html',
  styleUrl: './list-player.css',
})
export class ListPlayer {
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

  actionEvent(event: ActionPlayer<any>) {
    this.playerEventEmitter.emit(event);
  }
}
