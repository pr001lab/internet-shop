import {createReducer} from '@reduxjs/toolkit';
import {StatusLoading} from '../../const';
import {GuitarType} from '../../types/guitar';
import {
  getGuitarsDataReducer,
  getGuitarTypeListWithStrings
} from '../../utils/utils';
import {
  loadGuitarsFailure,
  loadGuitarsRequest,
  loadGuitarsSuccess
} from './actions';

export type DataType = {
  guitars: GuitarType[],
  guitarsCount: number,
  guitarsPriceMin: string,
  guitarsPriceMax: string,
  guitarTypeListWithStrings: {[key: string]: number[]} | null,
  guitarsLoading: StatusLoading,
  guitarsLoadingError: string | null,
};

const initialState: DataType = {
  guitars: [],
  guitarsCount: 0,
  guitarsPriceMin: '',
  guitarsPriceMax: '',
  guitarTypeListWithStrings: null,
  guitarsLoading: StatusLoading.Idle,
  guitarsLoadingError: null,
};

const dataGiutarsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitarsRequest, (state) => {
      state.guitarsLoading = StatusLoading.Loading;
    })
    .addCase(loadGuitarsSuccess, (state, action) => {
      const {guitars, guitarsCount} = action.payload;
      if (state.guitarsPriceMin === '') {
        const {priceMinData, priceMaxData} = getGuitarsDataReducer(guitars);
        state.guitarsPriceMin = String(priceMinData);
        state.guitarsPriceMax = String(priceMaxData);
        state.guitarTypeListWithStrings = getGuitarTypeListWithStrings(guitars);
      }
      state.guitars = guitars;
      state.guitarsCount = guitarsCount;
      state.guitarsLoading = StatusLoading.Succeeded;
    })
    .addCase(loadGuitarsFailure, (state, action) => {
      const {error} = action.payload;
      state.guitarsLoading = StatusLoading.Failed;
      state.guitarsLoadingError = error;
    });

});

export {dataGiutarsReducer};
