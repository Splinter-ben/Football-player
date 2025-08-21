import { Routes } from '@angular/router';
import { Players } from './components/player/players';
import { Newplayer } from './components/new-player/new-player';
import { Editplayer } from './components/edit-player/edit-player';

export const routes: Routes = [
  { path: 'playersComponent', component: Players },
  { path: 'new-playerComponent', component: Newplayer },
  { path: 'edit-playerComponent/:id', component: Editplayer },
];
