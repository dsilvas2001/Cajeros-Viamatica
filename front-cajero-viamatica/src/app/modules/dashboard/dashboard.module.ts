import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardNavbarComponent } from './components/dashboard-navbar/dashboard-navbar.component';
import { ComponentsModule } from '../shared/components/components.module';

@NgModule({
  declarations: [
    DashboardHomeComponent,
    WelcomeComponent,
    DashboardSidebarComponent,
    DashboardNavbarComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, ComponentsModule],
})
export class DashboardModule {}
