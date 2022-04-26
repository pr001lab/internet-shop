import {createReducer} from '@reduxjs/toolkit';
import {StatusLoading} from '../../const';
import {ReviewType} from '../../types/review';
import {
  loadReviewsFailure,
  loadReviewsRequest,
  loadReviewsSuccess
} from './actions';

export type DataType = {
  reviews: ReviewType[],
  reviewsLoading: StatusLoading,
  reviewsLoadingError: string | null,
};

const initialState: DataType = {
  reviews: [],
  reviewsLoading: StatusLoading.Idle,
  reviewsLoadingError: null,
};

const dataReviewsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadReviewsRequest, (state) => {
      state.reviewsLoading = StatusLoading.Loading;
    })
    .addCase(loadReviewsSuccess, (state, action) => {
      const {reviews} = action.payload;
      state.reviews = reviews;
      state.reviewsLoading = StatusLoading.Succeeded;
    })
    .addCase(loadReviewsFailure, (state, action) => {
      const {error} = action.payload;
      state.reviewsLoading = StatusLoading.Failed;
      state.reviewsLoadingError = error;
    });

});

export {dataReviewsReducer};
