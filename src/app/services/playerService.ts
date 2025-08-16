import { inject, Injectable, Signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPlayer } from '../model/players';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private http = inject(HttpClient);
  private apiURL = 'http://localhost:3000/';

  getPlayer(id: number): Observable<IPlayer[]> {
    return this.http.get<IPlayer[]>(this.apiURL + 'players?id=' + id);
  }

  getAllPlayers(): Observable<IPlayer[]> {
    return this.http.get<IPlayer[]>(this.apiURL + 'players');
  }

  getAllPlayerSelected(): Observable<IPlayer[]> {
    return this.http.get<IPlayer[]>(this.apiURL + 'players?selected=true');
  }

  getAllPlayerSearch(playerName: string): Observable<IPlayer[]> {
    return this.http.get<IPlayer[]>(
      this.apiURL + 'players?playerName_like=' + playerName
    );
  }

  updatePlayer(player: IPlayer): Observable<IPlayer> {
    return this.http.put<IPlayer>(this.apiURL + 'players/' + player.id, player);
  }

  changeStatus(player: IPlayer): Observable<IPlayer> {
    player.selected = !player.selected;
    return this.http.put<IPlayer>(this.apiURL + 'players/' + player.id, player);
  }

  deletePlayer(p: IPlayer): Observable<IPlayer> {
    return this.http.delete<IPlayer>(`${this.apiURL}players/${p.id}`);
  }

  createPlayer(player: Omit<IPlayer, 'id'>): Observable<IPlayer> {
    return this.http.post<IPlayer>(this.apiURL + 'players', player);
  }
}
