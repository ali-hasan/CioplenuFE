import { createSelector } from '@ngrx/store';
import { AppState, FilterModel } from '../app.state';

export const filterSelector = (state: AppState) => state.filter;

export const filters = () => createSelector(
  filterSelector,
  (filter: FilterModel) => {
    return filter;
  }
)
