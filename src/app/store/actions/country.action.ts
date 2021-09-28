import { createAction, props } from '@ngrx/store';
import { CountryModel } from '../../home/model/country.model';
import { FilterModel } from '../app.state';

export const retrievedCountriesList = createAction(
  '[Country API] Country API Success',
  props<{ allCountries: CountryModel[] }>()
);

export const invokeCountriesAPI = createAction('[Country API] Invoke API');

export const retrievedCountry = createAction(
  '[Country API] Single Country API Success',
  props<{ country: CountryModel }>()
);

export const invokeSingleCountryAPI = createAction('[Country API] Invoke Single Country API', props<{countryName: string | null}>());

export const filterDataStored = createAction('[Filtered Data] Store filtered data', props<{filtermodel : FilterModel}>());

export const regionFilterStored = createAction('[Filtered Data] Store filtered data', props<{regionFilter : string}>());