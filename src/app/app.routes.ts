import { Routes } from '@angular/router';
import { Players } from './components/player/players';
import { Newplayer } from './components/newplayer/newplayer';
import { Editplayer } from './components/editplayer/editplayer';

export const routes: Routes = [
  { path: 'playersComponent', component: Players },
  { path: 'newPlayerComponent', component: Newplayer },
  { path: 'editPlayerComponent/:id', component: Editplayer },
];
