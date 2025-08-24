import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActionPlayer, ActionPlayerType } from '../../../actions/action-player';
import { EventDrivenService } from '../../../services/event-driven-service';

@Component({
  selector: 'app-navbar-player',
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar-player.html',
  styleUrl: './navbar-player.css',
})
export class NavbarPlayer {
  private eventDriveService = inject(EventDrivenService);
  protected readonly playerName = signal('');

  onGetAllPlayers() {
    this.eventDriveService.publishAction({
      type: ActionPlayerType.GET_ALL_PLAYERS,
    });
  }

  onGetAllPlayersSelected() {
    this.eventDriveService.publishAction({
      type: ActionPlayerType.GET_ALL_PLAYER_SELECTED,
    });
  }

  onNewPlayers() {
    this.eventDriveService.publishAction({
      type: ActionPlayerType.NEW_PLAYER,
    });
  }

  onSearch() {
    this.eventDriveService.publishAction({
      type: ActionPlayerType.GET_ALL_PLAYER_SEARCH, payload: this.playerName()
    });
  }
}
