import {
  Component,
  OnInit,
  Signal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { routes } from '../../app.routes';
import { RouterLink, RouterOutlet } from '@angular/router';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { DataState, StateStatus } from '../../state/playersate';
import { IPlayers } from '../../model/players';
import { PlayerService } from '../../services/playerService';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPencil,
  faTrash,
  faUserCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-players',
  imports: [AsyncPipe, CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './players.html',
  styleUrl: './players.css',
})
export class Players implements OnInit {
  faPencil = faPencil;
  faTrash = faTrash;
  faUserCheck = faUserCheck;
  protected readonly StateStatus = StateStatus;
  protected playersObservable$ = new Observable<DataState<IPlayers[]>>();
  private playerService = inject(PlayerService);
  protected playerName = signal('');

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

  onSearch() {
    this.playersObservable$ = this.playerService
      .getAllPlayerSearch(this.playerName())
      .pipe(
        map(
          (data) => (
            console.log(data),
            {
              dataStateStatus: StateStatus.LOADED,
              dataState: data,
            }
          )
        ),
        startWith({ dataStateStatus: StateStatus.LOADING }),
        catchError((error) =>
          of({ dataStateStatus: StateStatus.ERROR, dataStateError: error })
        )
      );
  }

  onChangeStatus(p: IPlayers) {
    this.playerService.changeStatus(p).subscribe((data: IPlayers) => {
      return data.selected;
    });
  }

  onUpdatePlayer() {}

  onNewPlayers() {}

  onDeletePlayers(p: IPlayers) {
    let conf = confirm(
      `Are you sure you want to delete the player: ${p.playerName}?`
    );
    if (conf) {
      this.playerService.deletePlayer(p).subscribe({
        next: (data) => {
          console.log('Player deleted successfully:', data);
          // Filter out the deleted player from the current observable
          this.playersObservable$ = this.playersObservable$.pipe(
            map((state) => {
              if (
                state.dataStateStatus === StateStatus.LOADED &&
                state.dataState
              ) {
                return {
                  ...state,
                  dataState: state.dataState.filter(
                    (player) => player.id !== p.id
                  ),
                };
              }
              return state;
            })
          );
        },
        error: (error) => {
          console.error('Error deleting player:', error);
          alert('Failed to delete player. Please try again.');
        },
      });
    }
  }
}
