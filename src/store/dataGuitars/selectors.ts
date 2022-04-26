import {createSelector} from 'reselect';
import {StatusLoading} from '../../const';
import {GuitarType} from '../../types/guitar';
import {NameSpace, State} from '../root-reducer';

export const selectGuitars = (state: State): GuitarType[] => (
  state[NameSpace.DataGuitars].guitars
);
export const selectGuitarsCount = (state: State): number => (
  state[NameSpace.DataGuitars].guitarsCount
);
export const selectGuitarsPriceMin = (state: State): string => (
  state[NameSpace.DataGuitars].guitarsPriceMin
);
export const selectGuitarsPriceMax = (state: State): string => (
  state[NameSpace.DataGuitars].guitarsPriceMax
);
export const selectGuitarTypeListWithStrings = (state: State): {[key: string]: number[]} | null => (
  state[NameSpace.DataGuitars].guitarTypeListWithStrings
);
export const selectStringCountList = createSelector(
  [selectGuitarTypeListWithStrings],
  (guitarTypeListWithStrings) => {
    if(guitarTypeListWithStrings === null) {
      return [];
    }

    const stringCounts = Object
      .entries(guitarTypeListWithStrings)
      .reduce((
        acc: number[],
        guitarTypeListWithString,
      ) => [...acc, ...guitarTypeListWithString[1]], [])
      .reduce((
        acc: number[],
        item: number,
      ) => acc.includes(item) ? acc : [...acc, item], []);

    return stringCounts;
  },
);

export const selectGuitarsLoading = (state: State): StatusLoading => (
  state[NameSpace.DataGuitars].guitarsLoading
);
export const selectGuitarsLoadingError = (state: State): string | null => (
  state[NameSpace.DataGuitars].guitarsLoadingError
);
