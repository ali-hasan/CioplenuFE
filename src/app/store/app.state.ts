import { CountryModel } from '../home/model/country.model';

export interface AppState {
  countries: CountryModel[];
  country: CountryModel;
  filter: FilterModel;
}

export interface FilterModel {
  nameFilter: string,
  regionFilter: string;
}