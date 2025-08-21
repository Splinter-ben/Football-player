import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faPencil,
  faTrash,
  faUserCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { IPlayer } from '../../../../model/players';
import {
  ActionPlayer,
  ActionPlayerType,
} from '../../../../actions/action-player';

@Component({
  selector: 'app-item-player',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './item-player.html',
  styleUrl: './item-player.css',
})
export class ItemPlayer {
  protected readonly faPencil = faPencil;
  protected readonly faTrash = faTrash;
  protected readonly faUserCheck = faUserCheck;
  @Input() p!: IPlayer;
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
