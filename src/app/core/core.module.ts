import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { AuthService } from './auth.service';

import { AppHttpInterceptor } from './app.http.interceptor';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { LoaderService } from './loader.service';


@NgModule({
  imports: [
    HttpClientModule,
    BrowserAnimationsModule
  ],
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    AuthService, LoaderService
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
