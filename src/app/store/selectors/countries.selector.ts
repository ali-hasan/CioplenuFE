import { createSelector } from '@ngrx/store';
import { CountryModel } from '../../home/model/country.model';

import { AppState, FilterModel } from '../app.state';

export const countriesSelector = (state: AppState) => state.countries;

export const countriesList = (countryName: string) => createSelector(
  countriesSelector,
  (countries:CountryModel[]) => {
    if (countryName === '' || countryName === undefined || countryName === null)
        return countries;
    return countries.filter(_ => _.name === countryName);
  }
)
