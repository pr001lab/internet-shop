import {createReducer} from '@reduxjs/toolkit';
import {StatusLoading} from '../../const';
import {postCouponFailure, postCouponRequest, postCouponSuccess} from './actions';


export type DataType = {
  postCoupon: number,
  postCouponLoading: StatusLoading,
  postCouponLoadingError: string | null,
};

const initialState: DataType = {
  postCoupon: 0,
  postCouponLoading: StatusLoading.Idle,
  postCouponLoadingError: null,
};

const dataCouponPostReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(postCouponRequest, (state) => {
      state.postCouponLoading = StatusLoading.Loading;
    })
    .addCase(postCouponSuccess, (state, action) => {
      const {postCoupon} = action.payload;
      state.postCoupon = postCoupon;
      state.postCouponLoading = StatusLoading.Succeeded;
    })
    .addCase(postCouponFailure, (state, action) => {
      const {error} = action.payload;
      state.postCouponLoading = StatusLoading.Failed;
      state.postCouponLoadingError = error;
    });

});

export {dataCouponPostReducer};
