import {createAction} from '@reduxjs/toolkit';
import {ReviewPostType} from '../../types/review';

export enum ActionType {
  PostReviewRequest = 'data/PostReviewRequest',
  PostReviewSuccess = 'data/PostReviewSuccess',
  PostReviewFailure = 'data/PostReviewFailure',
  PostReviewIdle = 'data/PostReviewIdle',
}

export const postReviewRequest = createAction(ActionType.PostReviewRequest);

export const postReviewSuccess = createAction(
  ActionType.PostReviewSuccess, (postReview: ReviewPostType) => ({
    payload: {
      postReview,
    },
  }),
);

export const postReviewFailure = createAction(
  ActionType.PostReviewFailure, (error: string | null) => ({
    payload: {
      error,
    },
  }),
);

export const postReviewIdle = createAction(ActionType.PostReviewIdle);
