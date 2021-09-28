import { createReducer, on } from '@ngrx/store';
import { CountryModel } from 'src/app/home/model/country.model';
import { FilterModel } from '../app.state';
import { retrievedCountry } from '../actions/country.action';

export const initialState: CountryModel = {
  name: '',
  full_name: '',
  capital: '',
  iso2: '',
  iso3: '',
  covid19: {
    total_case: '',
    total_deaths: '',
    last_updated: ''
  },
  currentPresident: {
    name: '',
    gender: '',
    appointmentDtartDate: '',
    appointmentEndDate: null
  },
  currency: '',
  phone_code: '',
  continent: '',
  description: '',
  size: '',
  independence_date: '',
  population: '',
  href: {
    self: '',
    states: '',
    presidents: '',
    flag: ''
  }
};

const _cntReducer = createReducer(
  initialState,
  on(retrievedCountry, (state, { country }) => {
    return country;
  })
);

export function singleCountryReducer(state: any, action: any) {
  return _cntReducer(state, action);
}
