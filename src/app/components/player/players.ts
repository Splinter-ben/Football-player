import { Component, OnInit, inject, signal } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { DataState, StateStatus } from '../../state/playersate';
import { IPlayer } from '../../model/players';
import { PlayerService } from '../../services/playerService';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPencil,
  faTrash,
  faUserCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarPlayer } from './navbar-player/navbar-player';
import { ActionPlayer, ActionPlayerType } from '../../actions/action-player';
@Component({
  selector: 'app-players',
  imports: [
    AsyncPipe,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    NavbarPlayer,
  ],
  templateUrl: './players.html',
  styleUrl: './players.css',
})
export class Players implements OnInit {
  protected readonly faPencil = faPencil;
  protected readonly faTrash = faTrash;
  protected readonly faUserCheck = faUserCheck;
  protected readonly StateStatus = StateStatus;
  protected playersObservable$ = new Observable<DataState<IPlayer[]>>();
  private readonly playerService = inject(PlayerService);
  private readonly router = inject(Router);
  protected readonly playerName = signal('');

  ngOnInit(): void {}

  onGetAllPlayers() {
    this.playersObservable$ = this.playerService.getAllPlayers().pipe(
      map((data) => ({
        dataStateStatus: StateStatus.LOADED,
        dataState: data,
      })),
      startWith({ dataStateStatus: StateStatus.LOADING }),
      catchError((error) =>
        of({ dataStateStatus: StateStatus.ERROR, dataStateError: error })
      )
    );
  }

  onGetAllPlayersSelected() {
    this.playersObservable$ = this.playerService.getAllPlayerSelected().pipe(
      map((data) => ({
        dataStateStatus: StateStatus.LOADED,
        dataState: data,
      })),
      startWith({ dataStateStatus: StateStatus.LOADING }),
      catchError((error) =>
        of({ dataStateStatus: StateStatus.ERROR, dataStateError: error })
      )
    );
  }

  onSearch(playload: string) {
    this.playersObservable$ = this.playerService
      .getAllPlayerSearch(playload)
      .pipe(
        map((data) => ({
          dataStateStatus: StateStatus.LOADED,
          dataState: data,
        })),
        startWith({ dataStateStatus: StateStatus.LOADING }),
        catchError((error) =>
          of({ dataStateStatus: StateStatus.ERROR, dataStateError: error })
        )
      );
  }

  onChangeStatus(p: IPlayer) {
    this.playerService.changeStatus(p).subscribe((data: IPlayer) => {
      return data.selected;
    });
  }

  onEditPlayer(p: IPlayer) {
    this.router.navigateByUrl('/editPlayerComponent/' + p.id);
  }

  onNewPlayers() {
    this.router.navigateByUrl('/newPlayerComponent');
  }

  onDeletePlayers(p: IPlayer) {
    let conf = confirm(
      `Are you sure you want to delete the player: ${p.playerName}?`
    );
    if (conf) {
      this.playerService.deletePlayer(p).subscribe({
        next: () => {
          this.onGetAllPlayers;
        },
        error: (error) => {
          console.error('Error deleting player:', error);
          alert('Failed to delete player. Please try again.');
        },
      });
    }
  }

  actionEvent(event: ActionPlayer<any>) {
    switch (event.type) {
      case ActionPlayerType.GET_ALL_PLAYERS:
        this.onGetAllPlayers();
        break;
      case ActionPlayerType.GET_ALL_PLAYER_SELECTED:
        this.onGetAllPlayersSelected();
        break;
      case ActionPlayerType.GET_ALL_PLAYER_SEARCH:
        this.onSearch(event.payload);
        break;
      case ActionPlayerType.NEW_PLAYER:
        this.onNewPlayers();
    }
  }
}
