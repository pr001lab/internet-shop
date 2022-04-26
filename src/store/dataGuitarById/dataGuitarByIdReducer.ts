import {createReducer} from '@reduxjs/toolkit';
import {StatusLoading} from '../../const';
import {GuitarType} from '../../types/guitar';
import {
  loadGuitarByIdFailure,
  loadGuitarByIdRequest,
  loadGuitarByIdSuccess
} from './actions';

export type DataType = {
  guitarById: GuitarType | null,
  guitarByIdLoading: StatusLoading,
  guitarByIdLoadingError: string | null,
};

const initialState: DataType = {
  guitarById: null,
  guitarByIdLoading: StatusLoading.Idle,
  guitarByIdLoadingError: null,
};

const dataGiutarByIdReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitarByIdRequest, (state) => {
      state.guitarByIdLoading = StatusLoading.Loading;
    })
    .addCase(loadGuitarByIdSuccess, (state, action) => {
      const {guitarById} = action.payload;
      state.guitarById = guitarById;
      state.guitarByIdLoading = StatusLoading.Succeeded;
    })
    .addCase(loadGuitarByIdFailure, (state, action) => {
      const {error} = action.payload;
      state.guitarByIdLoading = StatusLoading.Failed;
      state.guitarByIdLoadingError = error;
    });

});

export {dataGiutarByIdReducer};
