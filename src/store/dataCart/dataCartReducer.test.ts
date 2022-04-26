import {makeFakeCount, mockGuitar, mockGuitarWithQuantity} from '../../utils/mocks';
import {productIncreaseQuantity, productQuantityChangeCart, productReduceQuantity, productRemove} from './actions';
import {dataCartReducer, DataType} from './dataCartReducer';

describe('Reducer: data', () => {
  let state: DataType = {
    cartProducts: {},
  };
  beforeEach(() => {
    state = {
      cartProducts: {1: mockGuitarWithQuantity},
    };
  });

  it('Reduce Quantity in state', () => {
    expect(dataCartReducer(state, productReduceQuantity(mockGuitar)))
      .toEqual({
        ...state,
        cartProducts: {
          ...state.cartProducts,
          [mockGuitar.id]: {
            ...state.cartProducts[mockGuitar.id],
            quantity: 0,
          },
        },
      });
  });

  it('Quantity Change in state', () => {
    const mockQuantity = makeFakeCount();

    expect(dataCartReducer(state, productQuantityChangeCart(mockQuantity, mockGuitarWithQuantity)))
      .toEqual({
        ...state,
        cartProducts: {
          ...state.cartProducts,
          [mockGuitar.id]: {
            ...state.cartProducts[mockGuitar.id],
            quantity: mockQuantity,
          },
        },
      });
  });

  it('Increase Quantity in state', () => {
    expect(dataCartReducer(state, productIncreaseQuantity(mockGuitar)))
      .toEqual({
        ...state,
        cartProducts: {
          ...state.cartProducts,
          [mockGuitar.id]: {
            ...state.cartProducts[mockGuitar.id],
            quantity: 2,
          },
        },
      });
  });

  it('Product Remove in state', () => {
    expect(dataCartReducer(state, productRemove(mockGuitar)))
      .not.toEqual({
        ...state.cartProducts[mockGuitar.id],
      });
  });

});
