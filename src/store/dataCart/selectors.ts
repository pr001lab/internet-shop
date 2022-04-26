import {NameSpace, State} from '../root-reducer';
import {ProductWithQuantity} from './dataCartReducer';

export const selectCartProducts = (state: State): {[key: number]: ProductWithQuantity} => (
  state[NameSpace.DataCart].cartProducts
);
