import { Component, OnInit, inject, signal } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-players',
  imports: [AsyncPipe, CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './players.html',
  styleUrl: './players.css',
})
export class Players implements OnInit {
  protected readonly faPencil = faPencil;
  protected readonly faTrash = faTrash;
  protected readonly faUserCheck = faUserCheck;
  protected readonly StateStatus = StateStatus;
  protected playersObservable$ = new Observable<DataState<IPlayers[]>>();
  private readonly playerService = inject(PlayerService);
  private readonly router = inject(Router);
  protected readonly playerName = signal('');

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

  onNewPlayers() {
    this.router.navigateByUrl('/newPlayerComponent');
  }

  onDeletePlayers(p: IPlayers) {
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
}
