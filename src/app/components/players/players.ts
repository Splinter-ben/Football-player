import { Component, OnInit, inject } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterLink, RouterOutlet } from '@angular/router';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { DataState, StateStatus } from '../../state/playersate';
import { IPlayers } from '../../model/players';
import { PlayerService } from '../../services/playerService';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faTrash, faUserCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-players',
  imports: [AsyncPipe, CommonModule, FontAwesomeModule],
  templateUrl: './players.html',
  styleUrl: './players.css',
})
export class Players implements OnInit {
  protected playersObservable$ = new Observable<DataState<IPlayers[]>>();
  private playerService = inject(PlayerService);
  protected readonly StateStatus = StateStatus;
  faPencil = faPencil;
  faTrash = faTrash;
  faUserCheck = faUserCheck;

  ngOnInit(): void {
    this.onGetAllPlayers();
  }

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

  onGetAllPlayersSelected() {}

  onNewPlayers() {}

  onSearch() {}

  onSelectedPlayer() {}

  onUpdatePlayer() {}

  deletePlayer() {}
}
