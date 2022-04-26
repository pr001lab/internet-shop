import {createAction} from '@reduxjs/toolkit';
import {GuitarType} from '../../types/guitar';

export enum ActionType {
  LoadGuitarsRequest = 'data/loadGuitarsRequest',
  LoadGuitarsSuccess = 'data/loadGuitarsSuccess',
  LoadGuitarsFailure = 'data/loadGuitarsFailure',
}

export const loadGuitarsRequest = createAction(ActionType.LoadGuitarsRequest);

export const loadGuitarsSuccess = createAction(
  ActionType.LoadGuitarsSuccess, (guitars: GuitarType[], guitarsCount: number) => ({
    payload: {
      guitars,
      guitarsCount,
    },
  }),
);

export const loadGuitarsFailure = createAction(
  ActionType.LoadGuitarsFailure, (error: string | null) => ({
    payload: {
      error,
    },
  }),
);
