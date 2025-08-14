import { inject, Injectable, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlayers } from '../model/players';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private http = inject(HttpClient);
  private apiURL = 'http://localhost:3000/';

  getAllPlayers(): Observable<IPlayers[]> {
    return this.http.get<IPlayers[]>(this.apiURL + 'players');
  }

  getAllPlayerSelected(): Observable<IPlayers[]> {
    return this.http.get<IPlayers[]>(this.apiURL + 'players?selected=true');
  }

  getAllPlayerSearch(playerName: string): Observable<IPlayers[]> {
    return this.http.get<IPlayers[]>(
      this.apiURL + 'players?playerName_like=' + playerName
    );
  }

  changeStatus(p: IPlayers): Observable<IPlayers> {
    p.selected = !p.selected;
    return this.http.put<IPlayers>(this.apiURL + 'players/' + p.id, p);
  }

  deletePlayer(p: IPlayers): Observable<IPlayers> {
    return this.http.delete<IPlayers>(`${this.apiURL}players/${p.id}`);
  }
}
