import {createAction} from '@reduxjs/toolkit';

export enum ActionType {
  PostCouponRequest = 'data/PostCouponRequest',
  PostCouponSuccess = 'data/PostCouponSuccess',
  PostCouponFailure = 'data/PostCouponFailure',
}

export const postCouponRequest = createAction(ActionType.PostCouponRequest);

export const postCouponSuccess = createAction(
  ActionType.PostCouponSuccess, (postCoupon: number) => ({
    payload: {
      postCoupon,
    },
  }),
);

export const postCouponFailure = createAction(
  ActionType.PostCouponFailure, (error: string | null) => ({
    payload: {
      error,
    },
  }),
);
