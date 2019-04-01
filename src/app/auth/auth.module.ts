import { NgModule, ModuleWithProviders } from '@angular/core';

import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'register',
    component: AuthComponent
  }
]);

@NgModule({
  imports: [
    authRouting,
    SharedModule
  ],
  exports: [],
  declarations: [AuthComponent],
  providers: [],
})
export class AuthModule { }
