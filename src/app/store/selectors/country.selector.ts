import { createSelector } from '@ngrx/store';
import { CountryModel } from 'src/app/home/model/country.model';
import { AppState } from '../app.state';


export const singleCountrySelector = (state: AppState) => state.country;

export const singleCountry = () => createSelector(
  singleCountrySelector,
  (country:CountryModel) => {
    return country;
  }
)