import { createReducer, on } from '@ngrx/store';
import { FilterModel } from '../app.state';
import { filterDataStored, regionFilterStored } from '../actions/country.action';

// export const initialState: FilterModel = {
//     nameFilter: 'Albania',
//     regionFilter: 'Asia'
// };
 export const initialState: FilterModel = {
   nameFilter: '',
   regionFilter: ''
 };

const _filterReducer = createReducer(
  initialState,
  on(filterDataStored, (state, { filtermodel }) => {
    return filtermodel;
  })
  // on(regionFilterStored, (state, { regionFilter }) => {
  //   return regionFilter;
  // })
);

export function filterReducer(state: any, action: any) {
  return _filterReducer(state, action);
}
