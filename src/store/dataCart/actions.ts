import {createAction} from '@reduxjs/toolkit';
import {GuitarType} from '../../types/guitar';
import {ProductWithQuantity} from './dataCartReducer';

export enum ActionType {
  ProductReduceQuantity = 'data/productReduceQuantity',
  ProductQuantityChangeCart = 'data/productQuantityChangeCart',
  ProductIncreaseQuantity = 'data/productIncreaseQuantity',
  ProductRemove = 'data/productRemove',
}

export const productReduceQuantity = createAction(
  ActionType.ProductReduceQuantity, (guitar: GuitarType) => ({
    payload: {
      guitar,
    },
  }),
);

export const productQuantityChangeCart = createAction(
  ActionType.ProductQuantityChangeCart, (quantity: number, product: ProductWithQuantity) => ({
    payload: {
      quantity,
      product,
    },
  }),
);

export const productIncreaseQuantity = createAction(
  ActionType.ProductIncreaseQuantity, (guitar: GuitarType) => ({
    payload: {
      guitar,
    },
  }),
);

export const productRemove = createAction(
  ActionType.ProductRemove, (guitar: GuitarType) => ({
    payload: {
      guitar,
    },
  }),
);
