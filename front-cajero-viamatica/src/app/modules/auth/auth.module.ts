import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [CommonModule, AuthRoutingModule, ComponentsModule, SharedModule],
})
export class AuthModule {}
