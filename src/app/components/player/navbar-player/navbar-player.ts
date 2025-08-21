import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActionPlayer, ActionPlayerType } from '../../../actions/action-player';

@Component({
  selector: 'app-navbar-player',
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar-player.html',
  styleUrl: './navbar-player.css',
})
export class NavbarPlayer {
  @Output() PlayerEventEmitter: EventEmitter<ActionPlayer<string>> =
    new EventEmitter<ActionPlayer<string>>();
  protected readonly playerName = signal('');

  onGetAllPlayers() {
    this.PlayerEventEmitter.emit({ type: ActionPlayerType.GET_ALL_PLAYERS });
  }

  onGetAllPlayersSelected() {
    this.PlayerEventEmitter.emit({
      type: ActionPlayerType.GET_ALL_PLAYER_SELECTED,
    });
  }

  onNewPlayers() {
    this.PlayerEventEmitter.emit({ type: ActionPlayerType.NEW_PLAYER });
  }

  onSearch() {
    this.PlayerEventEmitter.emit({
      type: ActionPlayerType.GET_ALL_PLAYER_SEARCH,
      payload: this.playerName(),
    });
  }
}
