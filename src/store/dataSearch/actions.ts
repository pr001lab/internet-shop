import {createAction} from '@reduxjs/toolkit';
import {GuitarType} from '../../types/guitar';

export enum ActionType {
  LoadSearchGuitarsRequest = 'data/loadSearchGuitarsRequest',
  LoadSearchGuitarsSuccess = 'data/loadSearchGuitarsSuccess',
  LoadSearchGuitarsFailure = 'data/loadSearchGuitarsFailure',
}

export const loadSearchGuitarsRequest = createAction(ActionType.LoadSearchGuitarsRequest);

export const loadSearchGuitarsSuccess = createAction(
  ActionType.LoadSearchGuitarsSuccess, (guitars: GuitarType[]) => ({
    payload: {
      guitars,
    },
  }),
);

export const loadSearchGuitarsFailure = createAction(
  ActionType.LoadSearchGuitarsFailure, (error: string | null) => ({
    payload: {
      error,
    },
  }),
);
