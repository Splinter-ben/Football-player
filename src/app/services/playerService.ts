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

  getAllPlayerSearch(playerName: any): Observable<IPlayers[]> {
    return this.http.get<IPlayers[]>(
      this.baseUrl + 'players?playerName_like=' + playerName
    );
  }
}
