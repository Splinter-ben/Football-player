import { Routes } from '@angular/router';
import { Players } from './components/players/players';
import { Newplayer } from './components/newplayer/newplayer';

export const routes: Routes = [
  { path: 'playersComponent', component: Players },
  { path: 'newPlayerComponent', component: Newplayer },
];
