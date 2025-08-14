import { inject, Injectable, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlayers } from '../model/players';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/';

  getAllPlayers(): Observable<IPlayers[]> {
    return this.http.get<IPlayers[]>(this.baseUrl + 'players');
  }

  getAllPlayerSelected(): Observable<IPlayers[]> {
    return this.http.get<IPlayers[]>(this.baseUrl + 'players?selected=true');
  }

  getAllPlayerSearch(playerName: string): Observable<IPlayers[]> {
    return this.http.get<IPlayers[]>(
      this.baseUrl + 'players?playerName_like=' + playerName
    );
  }

  onChangeStatus(p: IPlayers): Observable<IPlayers> {
    p.selected = !p.selected;
    return this.http.put<IPlayers>(this.baseUrl + 'players/' + p.id, p);
  }
}
