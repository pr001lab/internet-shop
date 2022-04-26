import {createReducer} from '@reduxjs/toolkit';
import {
  loadSearchGuitarsRequest,
  loadSearchGuitarsSuccess,
  loadSearchGuitarsFailure
} from './actions';
import {StatusLoading} from '../../const';
import {GuitarType} from '../../types/guitar';

export type DataType = {
  searchGuitars: GuitarType[],
  searchGuitarsLoading: StatusLoading,
  searchGuitarsLoadingError: string | null,
};

const initialState: DataType = {
  searchGuitars: [],
  searchGuitarsLoading: StatusLoading.Idle,
  searchGuitarsLoadingError: null,
};

const dataSearchReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadSearchGuitarsRequest, (state) => {
      state.searchGuitarsLoading = StatusLoading.Loading;
    })
    .addCase(loadSearchGuitarsSuccess, (state, action) => {
      const {guitars} = action.payload;
      state.searchGuitars = guitars;
      state.searchGuitarsLoading = StatusLoading.Succeeded;
    })
    .addCase(loadSearchGuitarsFailure, (state, action) => {
      const {error} = action.payload;
      state.searchGuitarsLoading = StatusLoading.Failed;
      state.searchGuitarsLoadingError = error;
    });

});

export {dataSearchReducer};
