import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuardOutService} from "./helper/auth-guard-out.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./public/login/login.module').then(m => m.LoginPageModule),
    canActivate: [AuthGuardOutService]
  },

  {
    path: 'register',
    loadChildren: () => import('./public/register/register.module').then(m => m.RegisterPageModule),
    canActivate: [AuthGuardOutService]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'find-oponent',
    loadChildren: () => import('./private/find-oponent/find-oponent.module').then(m => m.FindOponentPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
