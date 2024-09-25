import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './pages/loading/loading.component';

@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  exports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
})
export class SharedModule {}
