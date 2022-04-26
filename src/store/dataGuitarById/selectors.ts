import {StatusLoading} from '../../const';
import {GuitarType} from '../../types/guitar';
import {NameSpace, State} from '../root-reducer';

export const selectGuitarById = (state: State): GuitarType | null => (
  state[NameSpace.DataGuitarById].guitarById
);
export const selectGuitarByIdLoading = (state: State): StatusLoading => (
  state[NameSpace.DataGuitarById].guitarByIdLoading
);
export const selectGuitarByIdLoadingError = (state: State): string | null => (
  state[NameSpace.DataGuitarById].guitarByIdLoadingError
);
