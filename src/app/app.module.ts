import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.route';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { countryReducer } from './store/reducers/countries.reducer';
import { HttpClientModule } from '@angular/common/http';
import { CountryService } from './home/services/country.service';
import { filterReducer } from './store/reducers/filter.reducer';
import { singleCountryReducer } from './store/reducers/country.reducer';
import { CountryEffect } from './store/country.effect';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    EffectsModule.forRoot([CountryEffect]),
    StoreModule.forRoot({ countries: countryReducer, country: singleCountryReducer, filter: filterReducer }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [CountryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
