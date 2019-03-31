import { NgModule, ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent
  }
]);

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    homeRouting,
    SharedModule
  ],
  providers: []
})
export class HomeModule { }
