import {createReducer} from '@reduxjs/toolkit';
import {GuitarType} from '../../types/guitar';
import {
  productIncreaseQuantity,
  productQuantityChangeCart,
  productReduceQuantity,
  productRemove
} from './actions';

export type ProductWithQuantity = GuitarType & {quantity: number};

export type DataType = {
  cartProducts: {[key: number]: ProductWithQuantity},
};

const initialState: DataType = {
  cartProducts: {},
};

const dataCartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(productReduceQuantity, (state, action) => {
      const {guitar} = action.payload;

      const isStateCartProducts = state.cartProducts[guitar.id];
      if (isStateCartProducts) {
        state.cartProducts[guitar.id].quantity = state.cartProducts[guitar.id].quantity - 1;
      }
    })
    .addCase(productQuantityChangeCart, (state, action) => {
      const {quantity, product} = action.payload;

      const isStateCartProducts = state.cartProducts[product.id];
      if (!isStateCartProducts) {
        state.cartProducts = {
          ...state.cartProducts,
          [product.id]: {
            ...state.cartProducts[product.id] = {...product, quantity: quantity},
          },
        };
      }
      if (isStateCartProducts) {
        state.cartProducts[product.id].quantity = quantity;
      }
    })
    .addCase(productIncreaseQuantity, (state, action) => {
      const {guitar} = action.payload;

      const isStateCartProducts = state.cartProducts[guitar.id];
      if (!isStateCartProducts) {
        state.cartProducts = {
          ...state.cartProducts,
          [guitar.id]: {
            ...state.cartProducts[guitar.id] = {...guitar, quantity: 1},
          },
        };
      }
      if (isStateCartProducts) {
        state.cartProducts[guitar.id].quantity = state.cartProducts[guitar.id].quantity + 1;
      }
    })
    .addCase(productRemove, (state, action) => {
      const {guitar} = action.payload;

      const isStateCartProducts = state.cartProducts[guitar.id];
      if (isStateCartProducts) {
        delete state.cartProducts[guitar.id];
      }
    });

});

export {dataCartReducer};
