import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CountryService } from './services/country.service';
import { HomeComponent } from './pages/home/home.component';
import { CountryComponent } from './pages/country/country.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: ':name',
    component: CountryComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [HomeComponent, CountryComponent],
  providers: []
})
export class HomeModule { }
