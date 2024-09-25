import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingComponent } from './modules/shared/pages/loading/loading.component';

const routes: Routes = [
  {
    path: 'Auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'Dashboard',
    loadChildren: () =>
      import('././modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'loading',
    component: LoadingComponent,
  },
  {
    path: '**',
    redirectTo: 'Auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
