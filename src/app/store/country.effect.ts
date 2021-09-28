import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { CountryService } from '../home/services/country.service';

@Injectable()
export class CountryEffect {
  constructor(
    private actions$: Actions,
    private countryService: CountryService,
  ) {}

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Country API] Invoke API'),
      mergeMap(() =>
        this.countryService
          .getCountries()
          .pipe(map((data) => ({ type: '[Country API] Country API Success', allCountries: data })))
      )
    )
  );

  loadCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Country API] Invoke Single Country API'),
      mergeMap((action: any) =>
        this.countryService
          .getCountry(action.countryName)
          .pipe(map((data) => ({ type: '[Country API] Single Country API Success', country: data })))
      )
    )
  );
}
