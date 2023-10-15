import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {CategoriesPageModule} from "../private/categories/categories.module";
import {AuthGuardService} from "../helper/auth-guard.service";

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'categories',
        loadChildren: () => import('./../private/categories/categories.module').then(m => m.CategoriesPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./../private/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'game/:data',
        loadChildren: () => import('./../private/game/game.module').then(m => m.GamePageModule)
      },
      {
        path: 'tournament',
        loadChildren: () => import('./../private/tournament/tournament.module').then( m => m.TournamentPageModule)
      },
      {
        path: 'types',
        loadChildren: () => import('./../private/types-of-game/types-of-game.module').then( m => m.TypesOfGamePageModule)
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
export class TabsPageRoutingModule {}
