import {createAction} from '@reduxjs/toolkit';
import {ReviewType} from '../../types/review';

export enum ActionType {
  LoadReviewsRequest = 'data/loadReviewsRequest',
  LoadReviewsSuccess = 'data/loadReviewsSuccess',
  LoadReviewsFailure = 'data/loadReviewsFailure',
}

export const loadReviewsRequest = createAction(ActionType.LoadReviewsRequest);

export const loadReviewsSuccess = createAction(
  ActionType.LoadReviewsSuccess, (reviews: ReviewType[]) => ({
    payload: {
      reviews,
    },
  }),
);

export const loadReviewsFailure = createAction(
  ActionType.LoadReviewsFailure, (error: string | null) => ({
    payload: {
      error,
    },
  }),
);
