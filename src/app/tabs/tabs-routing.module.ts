import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';
import {AuthGuardService} from "../helper/auth-guard.service";

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'profile',
        loadChildren: () => import('./../private/profile/profile.module').then(m => m.ProfilePageModule)
      },

      {
        path: 'types',
        loadChildren: () => import('../private/types-of-game/types-of-game.module').then(m => m.TypesOfGamePageModule)
      },
      //simple
      {
        path: 'game',
        loadChildren: () => import('./../private/game/game.module').then(m => m.GamePageModule)
      },
      //online
      {
        path: 'online-game',
        loadChildren: () => import('../private/online-game/online-game.module').then(m => m.OnlineGamePageModule)
      },
      //tournament
      {
        path: 'tournament',
        loadChildren: () => import('./../private/tournament/tournament.module').then(m => m.TournamentPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'types',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {
}
