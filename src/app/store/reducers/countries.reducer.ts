import { createReducer, on } from '@ngrx/store';
import { CountryModel } from '../../home/model/country.model';
import { regionFilterStored, retrievedCountriesList, retrievedCountry } from '../actions/country.action';

export const initialState: ReadonlyArray<CountryModel> = [];

const _countryReducer = createReducer(
  initialState,
  on(retrievedCountriesList, (state, { allCountries }) => {
    return [...allCountries];
  })
);

export function countryReducer(state: any, action: any) {
  return _countryReducer(state, action);
}
