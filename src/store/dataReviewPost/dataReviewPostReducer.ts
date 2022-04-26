import {createReducer} from '@reduxjs/toolkit';
import {StatusLoading} from '../../const';
import {ReviewPostType} from '../../types/review';
import {
  postReviewFailure,
  postReviewIdle,
  postReviewRequest,
  postReviewSuccess
} from './actions';

export type DataType = {
  postReview: ReviewPostType | null,
  postReviewLoading: StatusLoading,
  postReviewLoadingError: string | null,
};

const initialState: DataType = {
  postReview: null,
  postReviewLoading: StatusLoading.Idle,
  postReviewLoadingError: null,
};

const dataReviewPostReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(postReviewRequest, (state) => {
      state.postReviewLoading = StatusLoading.Loading;
    })
    .addCase(postReviewSuccess, (state, action) => {
      const {postReview} = action.payload;
      state.postReview = postReview;
      state.postReviewLoading = StatusLoading.Succeeded;
    })
    .addCase(postReviewFailure, (state, action) => {
      const {error} = action.payload;
      state.postReviewLoading = StatusLoading.Failed;
      state.postReviewLoadingError = error;
    })
    .addCase(postReviewIdle, (state) => {
      state.postReviewLoading = StatusLoading.Idle;
    });

});

export {dataReviewPostReducer};
