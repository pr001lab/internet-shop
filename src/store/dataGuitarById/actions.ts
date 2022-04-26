import {createAction} from '@reduxjs/toolkit';
import {GuitarType} from '../../types/guitar';

export enum ActionType {
  LoadGuitarByIdRequest = 'data/loadGuitarByIdRequest',
  LoadGuitarByIdSuccess = 'data/loadGuitarByIdSuccess',
  LoadGuitarByIdFailure = 'data/loadGuitarByIdFailure',
}

export const loadGuitarByIdRequest = createAction(ActionType.LoadGuitarByIdRequest);

export const loadGuitarByIdSuccess = createAction(
  ActionType.LoadGuitarByIdSuccess, (guitarById: GuitarType) => ({
    payload: {
      guitarById,
    },
  }),
);

export const loadGuitarByIdFailure = createAction(
  ActionType.LoadGuitarByIdFailure, (error: string | null) => ({
    payload: {
      error,
    },
  }),
);
