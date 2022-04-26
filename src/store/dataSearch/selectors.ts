import {StatusLoading} from '../../const';
import {GuitarType} from '../../types/guitar';
import {NameSpace, State} from '../root-reducer';

export const selectSearchGuitars = (state: State): GuitarType[] => (
  state[NameSpace.DataSearch].searchGuitars
);export const selectSearchGuitarsLoading = (state: State): StatusLoading => (
  state[NameSpace.DataSearch].searchGuitarsLoading
);
