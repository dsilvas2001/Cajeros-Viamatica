import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard-home',
        component: DashboardHomeComponent,
        children: [
          {
            path: '',
            component: WelcomeComponent,
          },
        ],
      },
      { path: '**', redirectTo: 'dashboard-home' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
